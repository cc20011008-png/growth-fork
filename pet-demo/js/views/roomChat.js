import { $, el, toast } from "../lib/dom.js";
import { getPet, saveState } from "../lib/store.js";
import { SKILLS } from "../config/skills.js";

const SKILL_ICON = {
  "literature-review": `<svg viewBox="0 0 24 24"><path d="M5 5h9v14H5zM14 8h5v11h-5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  "resume-polish": `<svg viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 8h6M9 12h6M9 16h4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  "cold-email": `<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  "interview-drill": `<svg viewBox="0 0 24 24"><path d="M12 3a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 20c1.2-3 3.2-4.5 6-4.5S16.8 17 18 20" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  "data-clean": `<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  "study-outline": `<svg viewBox="0 0 24 24"><path d="M5 6h14M5 12h10M5 18h7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
};
const PLUS = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`;
const SEND = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l16-8-6 18-2.5-7L4 12z"/></svg>`;

function esc(text) {
  const node = document.createElement("div");
  node.textContent = text;
  return node.innerHTML;
}

function formatText(text) {
  return esc(text).replace(/\n/g, "<br>");
}

function fileBadge(file) {
  if (file.type.startsWith("image/")) return "图片";
  if (file.type.startsWith("video/")) return "视频";
  if (/pdf/.test(file.type)) return "PDF";
  if (/word|document/.test(file.type) || /\.docx?$/i.test(file.name)) return "文档";
  if (/sheet|excel|csv/.test(file.type) || /\.(csv|xlsx?|xls)$/i.test(file.name)) return "表格";
  return "文件";
}

function fileSize(bytes) {
  return bytes < 1048576 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1048576).toFixed(1)} MB`;
}

export function mountRoomChat(state) {
  const root = $("#room-chat");
  if (!root) return;
  const pet = getPet(state);
  const userMark = (state.profile.name || "林").slice(0, 1);
  const attachments = [];
  let activeSkills = [SKILLS[0].title];
  let conversation = [];
  let sending = false;

  root.innerHTML = `
    <header class="room-chat-head">
      <img class="room-chat-face" src="${pet.faceImage || pet.image}" alt="">
      <h2>和我聊聊今天的学习</h2>
    </header>
    <div class="room-messages" id="room-messages"></div>
    <section class="room-help" aria-label="可用 Skill">
      <div class="room-skills" id="room-skills"></div>
    </section>
    <div class="room-attach" id="room-attach" hidden></div>
    <form class="room-compose" id="room-compose">
      <button class="room-plus" type="button" id="room-attach-btn" aria-label="添加本地素材">${PLUS}</button>
      <input id="room-file" type="file" multiple accept=".pdf,.doc,.docx,.txt,.md,.csv,.xlsx,.xls,image/*,video/*" hidden>
      <input id="room-input" autocomplete="off" placeholder="继续描述你的材料、需求或卡点…" aria-label="和${pet.name}对话">
      <button class="room-send" type="submit" id="room-send" aria-label="发送">${SEND}<span>发送</span></button>
    </form>
  `;

  const feed = $("#room-messages", root);
  const skillHost = $("#room-skills", root);
  const attachHost = $("#room-attach", root);
  const input = $("#room-input", root);
  const sendBtn = $("#room-send", root);

  function persist() {
    saveState(state);
  }

  function renderSkills() {
    skillHost.innerHTML = SKILLS.map((skill) => {
      const on = activeSkills.includes(skill.title) ? " on" : "";
      return `<button class="room-skill${on}" type="button" data-skill="${esc(skill.title)}">${SKILL_ICON[skill.id] || ""}${esc(skill.title.replace(/ Skill$/, ""))}</button>`;
    }).join("");
    skillHost.querySelectorAll(".room-skill").forEach((btn) => {
      btn.addEventListener("click", () => pickSkill(btn.dataset.skill));
    });
  }

  function renderAttach() {
    attachHost.hidden = attachments.length === 0;
    attachHost.innerHTML = attachments
      .map(
        (file, i) => `
        <span class="room-file">
          <b>${esc(file.name)}</b>
          <em>${fileBadge(file)} · ${fileSize(file.size)}</em>
          <button type="button" data-remove="${i}" aria-label="移除附件">×</button>
        </span>`,
      )
      .join("");
    attachHost.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.remove);
        if (attachments[i]?.url) URL.revokeObjectURL(attachments[i].url);
        attachments.splice(i, 1);
        renderAttach();
      });
    });
  }

  function addBubble(role, html) {
    const row = el("div", { className: `room-msg ${role}` });
    if (role === "assistant") {
      row.append(el("img", { className: "room-msg-face", src: pet.faceImage || pet.image, alt: "" }));
    } else {
      row.append(el("span", { className: "room-msg-mark", text: userMark }));
    }
    const bubble = el("div", { className: "room-bubble" });
    bubble.innerHTML = html;
    row.append(bubble);
    feed.append(row);
    feed.scrollTop = feed.scrollHeight;
    return row;
  }

  function remember(role, content) {
    conversation.push({ role, content });
    state.today.messages.push({ role, content, at: Date.now() });
    persist();
  }

  function pickSkill(title) {
    if (!activeSkills.includes(title)) activeSkills.push(title);
    if (activeSkills[0] !== title) {
      activeSkills = [title, ...activeSkills.filter((s) => s !== title)];
    }
    renderSkills();
    const line = `帮我用「${title}」推进今天的学习。`;
    input.value = line;
    send();
  }

  function setSending(value) {
    sending = value;
    sendBtn.disabled = value;
    input.disabled = value;
    sendBtn.classList.toggle("busy", value);
    sendBtn.querySelector("span").textContent = value ? "思考中" : "发送";
  }

  async function send(event) {
    event?.preventDefault();
    if (sending) return;
    const text = input.value.trim();
    const files = attachments.splice(0);
    renderAttach();
    if (!text && !files.length) return;

    const fileNote = files.length
      ? `\n\n我上传了：${files.map((f) => `${f.name}（${fileBadge(f)}，${fileSize(f.size)}）`).join("；")}。`
      : "";
    const visible = `${text ? formatText(text) : "我上传了本地素材，请帮我判断下一步。"}${files
      .map((f) => `<div class="room-file-note">附件 · ${esc(f.name)}</div>`)
      .join("")}`;
    addBubble("user", visible);
    remember("user", `${text || "我上传了本地素材，请帮我判断下一步。"}${fileNote}`);
    files.forEach((f) => f.url && URL.revokeObjectURL(f.url));
    input.value = "";
    setSending(true);
    const typing = addBubble("assistant", `${pet.name}正在根据 ${activeSkills.join("、")} 整理…`);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation, activeSkills }),
      });
      const data = await res.json();
      typing.remove();
      if (!res.ok) throw new Error(data.error || "对话服务暂时不可用。");
      addBubble("assistant", formatText(data.content));
      remember("assistant", data.content);
    } catch (error) {
      typing.remove();
      const fallback = `我先记下了。${error.message.includes("DEEPSEEK") ? "本地对话服务还没接通，你仍可以把材料和卡点发给我。" : error.message}`;
      addBubble("assistant", formatText(fallback));
      remember("assistant", fallback);
      toast(error.message);
    } finally {
      setSending(false);
      input.focus();
    }
  }

  $("#room-compose", root).addEventListener("submit", send);
  $("#room-attach-btn", root).addEventListener("click", () => $("#room-file", root).click());
  $("#room-file", root).addEventListener("change", (event) => {
    Array.from(event.target.files || []).slice(0, 8).forEach((file) => {
      attachments.push({
        name: file.name,
        type: file.type,
        size: file.size,
        url: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
      });
    });
    event.target.value = "";
    renderAttach();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  });

  renderSkills();
  const prior = (state.today.messages || []).filter((m) => m.role === "user" || m.role === "assistant");
  if (prior.length) {
    prior.forEach((msg) => {
      conversation.push({ role: msg.role, content: msg.content });
      addBubble(msg.role, formatText(msg.content));
    });
  } else {
    addBubble("assistant", formatText(pet.greeting));
    remember("assistant", pet.greeting);
  }

  requestAnimationFrame(() => root.classList.add("in"));
}
