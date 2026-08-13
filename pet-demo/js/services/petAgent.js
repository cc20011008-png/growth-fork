import { SKILLS } from "../config/skills.js";
import { getPet } from "../lib/store.js";
import { toDayKey } from "../lib/date.js";

/** Map pet-demo skill ids → skill-detail.html catalog ids */
const DETAIL_IDS = {
  "literature-review": "research",
  "resume-polish": "resume",
  "cold-email": "career",
  "interview-drill": "interview",
  "data-clean": "research",
  "study-outline": "exam",
};

/**
 * Aggregate learning signals from chat, calendar, goals, and bond.
 * @param {object} state
 */
export function collectSignals(state) {
  const signals = [];
  const userName = (state.profile?.name || "林").trim() || "林";
  const now = Date.now();
  const todayKey = toDayKey();

  // Stuck goals (no calendar progress mentioning the goal recently)
  (state.goals || [])
    .filter((g) => g.status === "active")
    .forEach((goal) => {
      const ageDays = Math.max(1, Math.floor((now - (goal.createdAt || now)) / 86400000));
      const mentioned = Object.values(state.calendar || {}).some((day) =>
        (day.items || []).some((item) => (item.title || "").includes(goal.title.slice(0, 4))),
      );
      if (ageDays >= 3 && !mentioned) {
        signals.push({
          id: `stuck-goal-${goal.id}`,
          kind: "stuck-goal",
          weight: 4 + Math.min(4, ageDays),
          chip: `目标卡住 ${ageDays} 天`,
          text: goal.title,
          note: goal.note || "",
          keywords: goal.title + " " + (goal.note || ""),
        });
      }
    });

  // Calendar backlog: incomplete self items recently + open todos from recent days
  const recentKeys = Object.keys(state.calendar || {})
    .sort()
    .slice(-7);
  let openish = 0;
  recentKeys.forEach((key) => {
    const day = state.calendar[key];
    if (!day?.items?.length && key < todayKey) openish += 1;
  });
  // Prefer calendar items that look unfinished relative to goals (demo heuristic)
  const lastDays = recentKeys.slice(-3);
  const pendingTitles = [];
  lastDays.forEach((key) => {
    (state.calendar[key]?.items || []).forEach((item) => {
      if (item.kind === "self" && !item.focusMinutes) pendingTitles.push(item.title);
    });
  });
  if (pendingTitles.length >= 1 || openish >= 2) {
    const count = Math.max(pendingTitles.length, openish);
    signals.push({
      id: "calendar-backlog",
      kind: "calendar",
      weight: 3 + Math.min(3, count),
      chip: `日历待办 ${count} 件`,
      text: pendingTitles[0] || "近日日历有空档与积压",
      keywords: pendingTitles.join(" ") || "计划 待办",
    });
  }

  // Chat / learning dialog keywords
  const msgs = (state.today?.messages || [])
    .map((m) => m.content || "")
    .join(" ");
  const chatHints = [
    { re: /实习|简历|项目化|投递/, label: "学习对话里提过实习", kw: "简历 实习 项目" },
    { re: /文献|综述|论文|阅读笔记/, label: "对话里在做综述", kw: "文献 综述 论文" },
    { re: /面试|自我介绍/, label: "对话里提过面试", kw: "面试 模拟" },
    { re: /邮件|外联|导师/, label: "对话里提过外联", kw: "冷邮件 邮件" },
  ];
  chatHints.forEach((hint) => {
    if (hint.re.test(msgs)) {
      signals.push({
        id: `chat-${hint.label}`,
        kind: "chat",
        weight: 3,
        chip: hint.label,
        text: hint.label,
        keywords: hint.kw,
      });
    }
  });

  // Skill usage imbalance from calendar seed
  const skillCount = {};
  Object.values(state.calendar || {}).forEach((day) => {
    (day.items || []).forEach((item) => {
      if (item.skillTitle) skillCount[item.skillTitle] = (skillCount[item.skillTitle] || 0) + 1;
    });
  });
  const litUses = skillCount["文献综述撰写 Skill"] || 0;
  const resumeUses = skillCount["简历项目化表达"] || 0;
  if (litUses >= 3 && resumeUses < 2) {
    signals.push({
      id: "imbalance-lit-vs-resume",
      kind: "imbalance",
      weight: 5,
      chip: `综述已做 ${litUses} 次`,
      text: `你这周文献综述已经做了 ${litUses} 次`,
      keywords: "简历 实习 项目化 投递",
    });
  }

  // Fallback demo signal so every refresh still gets a letter
  if (!signals.length) {
    signals.push({
      id: "fallback-explore",
      kind: "explore",
      weight: 2,
      chip: "市集闲逛",
      text: "想帮你发现下一个可用的 Skill",
      keywords: "大纲 复习 学习",
    });
  }

  return { userName, signals: signals.sort((a, b) => b.weight - a.weight) };
}

function scoreSkillAgainstSignals(skill, signals) {
  return signals.reduce((total, signal) => {
    const blob = `${signal.keywords || ""} ${signal.text || ""}`;
    const hits = skill.keywords.reduce((n, kw) => (blob.includes(kw) ? n + 1 : n), 0);
    const titleHit = blob.includes(skill.title.replace(/ Skill$/, "")) ? 2 : 0;
    return total + (hits + titleHit) * (signal.weight || 1);
  }, 0);
}

function pickSkill(signals) {
  const ranked = SKILLS
    .map((skill) => ({ skill, score: scoreSkillAgainstSignals(skill, signals) }))
    .sort((a, b) => b.score - a.score);
  const best = ranked[0]?.score > 0 ? ranked[0].skill : SKILLS.find((s) => s.id === "resume-polish") || SKILLS[0];
  return best;
}

function buildBody(pet, userName, signals, skill) {
  const top = signals.slice(0, 3);
  const stuck = top.find((s) => s.kind === "stuck-goal");
  const imbalance = top.find((s) => s.kind === "imbalance");
  const cal = top.find((s) => s.kind === "calendar");
  const skillShort = skill.title.replace(/ Skill$/, "");

  const lines = [`${userName}，`, ""];

  if (imbalance) {
    lines.push(`${imbalance.text}，很稳。`);
  } else if (top[0] && top[0].kind !== "stuck-goal") {
    lines.push(`我留意到：${top[0].text}。`);
  } else {
    lines.push("你这周也在认真推进，我看在眼里。");
  }

  if (stuck) {
    lines.push(
      `可「${stuck.text}」还停在半路${cal ? "，日历里也积了几件没勾掉的待办" : ""}。`,
    );
  } else if (cal) {
    lines.push("日历里最近也有些没清干净的事项。");
  }

  lines.push("");
  lines.push(`我出门转了一圈，从市集里拎回这个，觉得你现在可能用得上。`);

  // Keep skill name out of the last line so the postcard carries it — matches reference letter.
  void skillShort;

  return pet.voice(lines.filter((line, i) => !(line === "" && lines[i - 1] === "")).join("\n"));
}

/**
 * Demo C: always mint a fresh letter for this page load.
 * @param {object} state
 */
export function mintReturnLetter(state) {
  const pet = getPet(state);
  const { userName, signals } = collectSignals(state);
  const skill = pickSkill(signals);
  const chips = signals.slice(0, 3).map((s) => s.chip);

  const letter = {
    id: `letter-${Date.now()}`,
    at: Date.now(),
    status: "unread", // unread | opened | accepted | drawer
    title: "一封从市集寄回的信",
    body: buildBody(pet, userName, signals, skill),
    chips,
    skill: {
      id: skill.id,
      title: skill.title,
      blurb: skill.blurb,
      tomatoes: skill.tomatoes,
      detailId: DETAIL_IDS[skill.id] || "resume",
    },
  };

  state.petAgent = {
    status: "returned",
    lastTripAt: Date.now(),
    letter,
    drawer: Array.isArray(state.petAgent?.drawer) ? state.petAgent.drawer : [],
  };

  return letter;
}

export function acceptLetter(state) {
  const letter = state.petAgent?.letter;
  if (!letter) return null;
  letter.status = "accepted";
  state.petAgent.status = "home";
  return letter;
}

export function stashLetterInDrawer(state) {
  const letter = state.petAgent?.letter;
  if (!letter) return null;
  letter.status = "drawer";
  const drawer = state.petAgent.drawer || [];
  if (!drawer.some((item) => item.id === letter.id)) {
    drawer.unshift({
      id: letter.id,
      at: letter.at,
      skillTitle: letter.skill.title,
      skillId: letter.skill.id,
      detailId: letter.skill.detailId,
      body: letter.body,
    });
  }
  state.petAgent.drawer = drawer.slice(0, 12);
  state.petAgent.status = "home";
  state.petAgent.letter = null;
  return letter;
}

export function reopenDrawerLetter(state, letterId) {
  const item = (state.petAgent?.drawer || []).find((d) => d.id === letterId);
  if (!item) return null;
  const skill = SKILLS.find((s) => s.id === item.skillId) || SKILLS[0];
  const letter = {
    id: item.id,
    at: item.at,
    status: "opened",
    title: "抽屉里的信",
    body: item.body,
    chips: ["来自抽屉"],
    skill: {
      id: skill.id,
      title: skill.title,
      blurb: skill.blurb,
      tomatoes: skill.tomatoes,
      detailId: item.detailId || DETAIL_IDS[skill.id] || "resume",
    },
  };
  state.petAgent.letter = letter;
  state.petAgent.status = "returned";
  return letter;
}
