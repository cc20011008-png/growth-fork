const SYSTEM_PROMPT = `你是“Wowgrowth”中的成长任务助手。你将根据用户当前调用的 Skill，帮助大学生完成真实、合规的任务：拆解目标、整理材料、形成可验证成果，并提出下一步最小行动。

回答使用简体中文。直接给出用户要求的内容，不复述需求，不解释工作过程，不添加不必要的开场、总结、免责声明或下一步建议；普通回答尽量简短，用户要求完整文章时才按所需篇幅展开。不要使用 Markdown 标记，包括 #、*、**、反引号和分隔线。为了便于阅读，请使用纯文本标题、空行、数字编号或“•”项目符号组织内容，避免把全部内容写成一个连续段落。可以根据用户给出的主题和要求，直接撰写完整的文献综述、论文初稿、作业或报告。不编造具体文献、数据、项目经历或研究结论；缺少来源材料时，可以使用概括性论述完成正文，并用简短纯文本说明需核实之处。`;

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
        content: `${SYSTEM_PROMPT}\n\n当前用户已组合调用的 Skill：${activeSkills.length ? activeSkills.join("、") : "尚未指定，请根据用户当前学习目标直接提供帮助；若用户要求整理笔记、知识点、复习材料或自测题，优先按笔记整理复习包处理"}。直接执行用户当前要求；只有当用户询问流程时才解释各 Skill 的分工。不要假装已经执行用户未提供的数据分析、可视化或外部检索。`
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

async function requestStudyNotes(sourceText, fileNames = []) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("服务端尚未配置 DEEPSEEK_API_KEY。");
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      response_format: { type: "json_object" },
      messages: [{
        role: "system",
        content: `你是“笔记整理复习包 Skill”。根据材料生成可直接学习的完整复习包，必须只返回 JSON，不要 Markdown。结构：
{"title":"标题","subtitle":"材料说明","summary":"一句话主线","sections":[{"title":"章节标题","paragraphs":["正文"],"bullets":["要点"]}],"knowledge":[{"id":"K01","group":"分组","title":"知识点","plain":"人话解释","formula":"必要的公式或关键词","limit":"易错点或适用边界"}],"quiz":[{"k":"K01","type":"概念选择","q":"题目","o":["选项A","选项B","选项C","选项D"],"a":0,"why":"答案解释","wrong":"常见误区"}],"overview":[{"label":"主线节点","text":"一句解释"}]}
要求：sections 覆盖材料主线；knowledge 生成 6到12项；quiz 生成 5到10道且 a 为0到3；不编造材料没有的具体事实。`
      }, {
        role: "user",
        content: `文件：${fileNames.join("、") || "用户材料"}\n\n材料正文：\n${sourceText.slice(0, 26000)}`
      }],
      temperature: 0.35,
      max_tokens: 4000
    })
  });
  if (!response.ok) throw new Error(`DeepSeek 请求失败（${response.status}）：${(await response.text()).slice(0, 240)}`);
  const content = (await response.json())?.choices?.[0]?.message?.content;
  if (!content) throw new Error("模型没有返回可用的复习包。");
  try { return JSON.parse(content); } catch (_) { throw new Error("复习包结构生成失败，请重新上传。"); }
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
module.exports.requestStudyNotes = requestStudyNotes;
