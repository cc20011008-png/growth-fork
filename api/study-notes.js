const mammoth = require("mammoth");
const { PDFParse } = require("pdf-parse");
const { requestStudyNotes } = require("./chat");

const MAX_SOURCE_BYTES = 3 * 1024 * 1024;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "仅支持 POST 请求。" });
  }

  try {
    const files = Array.isArray(req.body?.files) ? req.body.files.slice(0, 5) : [];
    if (!files.length) throw new Error("请先上传学习材料。");

    const totalBytes = files.reduce((sum, file) => sum + Number(file.size || 0), 0);
    if (totalBytes > MAX_SOURCE_BYTES) {
      throw new Error("文件总大小不能超过 3 MB，请压缩或拆分后重试。");
    }

    const parts = [];
    for (const file of files) {
      const buffer = Buffer.from(String(file.data || ""), "base64");
      const name = String(file.name || "学习材料");

      if (/\.pdf$/i.test(name) || file.type === "application/pdf") {
        const parser = new PDFParse({ data: buffer });
        try {
          const result = await parser.getText();
          parts.push(`【${name}】\n${result.text}`);
        } finally {
          await parser.destroy();
        }
      } else if (/\.docx$/i.test(name)) {
        const result = await mammoth.extractRawText({ buffer });
        parts.push(`【${name}】\n${result.value}`);
      } else if (/\.(txt|md|csv)$/i.test(name) || /^text\//.test(file.type || "")) {
        parts.push(`【${name}】\n${buffer.toString("utf8")}`);
      } else {
        parts.push(`【${name}】\n该文件已上传，但当前版本暂不能抽取正文。请提示用户补充 PDF、DOCX、TXT、Markdown 或 CSV 版本。`);
      }
    }

    const sourceText = parts.join("\n\n").trim();
    if (sourceText.length < 20) throw new Error("没有从文件中读取到足够的文字内容。");

    const pack = await requestStudyNotes(sourceText, files.map(file => file.name));
    return res.status(200).json({ pack });
  } catch (error) {
    return res.status(500).json({ error: error.message || "复习包生成失败。" });
  }
};
