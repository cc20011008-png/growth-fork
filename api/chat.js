const SYSTEM_PROMPT = `你是“成长 Fork”中的文献综述撰写 Skill。你的任务是陪大学生完成真实、合规的文献综述写作过程：帮助其拆解主题、归类文献、识别研究脉络、构建综述结构，并提出下一步最小行动。

回答使用简体中文，保持清晰、具体、鼓励式。优先输出可执行的结构、问题或模板。不要代写可直接提交的完整论文，不编造文献、数据或研究结论；如果用户缺少材料，明确说明需要补充的论文题目、摘要、关键词或研究问题。每次回答末尾提出一个最关键的下一步问题或行动。`;

function getMessages(body) {
  const raw = Array.isArray(body.messages) ? body.messages : [];
  return raw
    .filter(item => item && typeof item.content === "string")
    .slice(-14)
    .map(item => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: item.content.slice(0, 6000)
    }));
}

function getActiveSkills(body) {
  const raw = Array.isArray(body.activeSkills) ? body.activeSkills : [];
  return raw.filter(skill => typeof skill === "string").slice(0, 5).map(skill => skill.slice(0, 80));
}

async function requestDeepSeek(messages, activeSkills = []) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("服务端尚未配置 DEEPSEEK_API_KEY。");
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{
        role: "system",
        content: `${SYSTEM_PROMPT}\n\n当前用户已组合调用的 Skill：${activeSkills.length ? activeSkills.join("、") : "文献综述撰写 Skill"}。请在回答中明确说明哪个 Skill 负责哪一步，并优先给出它们之间的衔接顺序；不要假装已经执行用户未提供的数据分析、可视化或外部检索。`
      }, ...messages],
      temperature: 0.55,
      max_tokens: 1000
    })
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`DeepSeek 请求失败（${response.status}）：${detail.slice(0, 240)}`);
  }
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("模型没有返回可用内容。");
  return content;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "仅支持 POST 请求。" });
  try {
    const body = req.body || {};
    const content = await requestDeepSeek(getMessages(body), getActiveSkills(body));
    return res.status(200).json({ content });
  } catch (error) {
    return res.status(500).json({ error: error.message || "对话服务暂时不可用。" });
  }
};

module.exports.requestDeepSeek = requestDeepSeek;
module.exports.getMessages = getMessages;
module.exports.getActiveSkills = getActiveSkills;
