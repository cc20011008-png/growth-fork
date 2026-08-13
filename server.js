const fs = require("fs");
const http = require("http");
const path = require("path");
const { requestDeepSeek, requestStudyNotes, getMessages, getActiveSkills } = require("./api/chat");
const mammoth = require("mammoth");
const { PDFParse } = require("pdf-parse");

function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim();
  }
}

loadEnv();
const root = __dirname;
const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp"
};

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/study-notes") {
    let raw = "";
    req.on("data", chunk => { raw += chunk; if (raw.length > 24 * 1024 * 1024) req.destroy(); });
    req.on("end", async () => {
      try {
        const body = JSON.parse(raw || "{}");
        const files = Array.isArray(body.files) ? body.files.slice(0, 5) : [];
        if (!files.length) throw new Error("请先上传学习材料。");
        const parts = [];
        for (const file of files) {
          const buffer = Buffer.from(String(file.data || ""), "base64");
          const name = String(file.name || "学习材料");
          if (/\.pdf$/i.test(name) || file.type === "application/pdf") {
            const parser = new PDFParse({ data: buffer });
            const result = await parser.getText();
            await parser.destroy();
            parts.push(`【${name}】\n${result.text}`);
          } else if (/\.docx$/i.test(name)) {
            const result = await mammoth.extractRawText({ buffer });
            parts.push(`【${name}】\n${result.value}`);
          } else if (/\.(txt|md|csv)$/i.test(name) || /^text\//.test(file.type || "")) {
            parts.push(`【${name}】\n${buffer.toString("utf8")}`);
          } else {
            parts.push(`【${name}】\n该文件已上传，但当前版本暂不能抽取其正文。请仅根据文件名建立复习框架，并提示用户补充可读取版本。`);
          }
        }
        const sourceText = parts.join("\n\n").trim();
        if (sourceText.length < 20) throw new Error("没有从文件中读取到足够的文字内容。");
        const pack = await requestStudyNotes(sourceText, files.map(file => file.name));
        sendJson(res, 200, { pack });
      } catch (error) {
        sendJson(res, 500, { error: error.message || "复习包生成失败。" });
      }
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    let raw = "";
    req.on("data", chunk => { raw += chunk; if (raw.length > 100000) req.destroy(); });
    req.on("end", async () => {
      try {
        const body = JSON.parse(raw || "{}");
        const content = await requestDeepSeek(getMessages(body), getActiveSkills(body));
        sendJson(res, 200, { content });
      } catch (error) {
        sendJson(res, 500, { error: error.message || "对话服务暂时不可用。" });
      }
    });
    return;
  }

  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const relativePath = urlPath === "/" ? "/pet-demo/index.html" : urlPath;
  let target = path.resolve(root, `.${relativePath}`);
  if (target.startsWith(root) && fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, "index.html");
  }
  if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Not found");
  }
  res.writeHead(200, { "Content-Type": mime[path.extname(target).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(target).pipe(res);
});

const port = Number(process.env.PORT || 3000);
server.listen(port, () => console.log(`Wowgrowth is running at http://localhost:${port}`));
