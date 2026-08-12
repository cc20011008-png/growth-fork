const fs = require("fs");
const http = require("http");
const path = require("path");
const { requestDeepSeek, getMessages, getActiveSkills } = require("./api/chat");

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

  const relativePath = decodeURIComponent(req.url.split("?")[0] === "/" ? "/index.html" : req.url.split("?")[0]);
  const target = path.resolve(root, `.${relativePath}`);
  if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Not found");
  }
  res.writeHead(200, { "Content-Type": mime[path.extname(target).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(target).pipe(res);
});

const port = Number(process.env.PORT || 3000);
server.listen(port, () => console.log(`Growth Fork is running at http://localhost:${port}`));
