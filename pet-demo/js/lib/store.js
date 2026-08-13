import { toDayKey } from "./date.js";
import { PETS } from "../config/pets.js";

const KEY = "gf-pet-demo-v3";

function seedGoals() {
  return [
    {
      id: "goal-lit-review",
      title: "高效完成文献综述初稿",
      note: "周五前交初稿，手头已有 8 篇论文。",
      deadline: "",
      status: "active",
      createdAt: Date.now() - 86400000 * 3,
    },
    {
      id: "goal-resume",
      title: "投出第一份实习简历",
      note: "内容运营方向，先把项目经历写清楚。",
      deadline: "",
      status: "active",
      createdAt: Date.now() - 86400000 * 8,
    },
  ];
}

const defaultState = () => ({
  onboarded: false,
  profile: {
    name: "",
    petId: "cat",
  },
  bond: {
    level: 1,
    xp: 12,
    focusMinutesTotal: 0,
    practiceCount: 0,
    streak: 0,
    lastActiveDay: null,
    achievements: [],
  },
  goals: seedGoals(),
  today: {
    dayKey: toDayKey(),
    goalsRaw: "",
    sourceGoalId: null,
    plan: null,
    messages: [],
    focus: null,
  },
  calendar: {},
  reports: {},
});

function seedCalendar(state) {
  if (Object.keys(state.calendar).length) return state;
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const samples = [
    { day: 1, items: [{ title: "文献阅读", kind: "skill", skillTitle: "文献综述撰写 Skill", focusMinutes: 40 }], reflection: "理清了研究缺口" },
    { day: 2, items: [{ title: "实验设计", kind: "self" }], reflection: "" },
    { day: 3, items: [{ title: "代码整理", kind: "self" }], reflection: "细节决定成败" },
    { day: 4, items: [{ title: "英语打卡", kind: "self" }], reflection: "" },
    { day: 5, items: [{ title: "文献主题归类", kind: "skill", skillTitle: "文献综述撰写 Skill", focusMinutes: 55 }], reflection: "收获了建议" },
    { day: 6, items: [{ title: "组会准备", kind: "self" }], reflection: "" },
    { day: 7, items: [{ title: "综述大纲", kind: "skill", skillTitle: "文献综述撰写 Skill", focusMinutes: 50 }], reflection: "结构比堆材料重要" },
    { day: 8, items: [{ title: "去图书馆还书", kind: "self" }, { title: "面试题复盘", kind: "skill", skillTitle: "面试模拟 Skill", focusMinutes: 30 }], reflection: "行为题要先讲结果" },
    { day: 9, items: [{ title: "简历改第1版", kind: "skill", skillTitle: "简历项目化表达", focusMinutes: 40 }], reflection: "" },
    { day: 10, items: [{ title: "文献阅读", kind: "skill", skillTitle: "文献综述撰写 Skill", focusMinutes: 35 }], reflection: "记下三处可引用" },
    { day: 11, items: [{ title: "冷邮件草稿", kind: "skill", skillTitle: "冷邮件沟通 Skill", focusMinutes: 25 }], reflection: "" },
    { day: 12, items: [{ title: "实验设计", kind: "self" }], reflection: "变量先写清" },
    { day: 13, items: [{ title: "代码整理", kind: "self" }], reflection: "" },
    { day: 14, items: [{ title: "英语打卡", kind: "self" }], reflection: "连续打卡有感觉" },
    { day: 15, items: [{ title: "文献阅读", kind: "skill", skillTitle: "文献综述撰写 Skill", focusMinutes: 45 }], reflection: "理清了研究缺口" },
    { day: 16, items: [{ title: "综述第一节", kind: "skill", skillTitle: "文献综述撰写 Skill", focusMinutes: 50 }], reflection: "" },
    { day: 17, items: [{ title: "组会纪要", kind: "self" }], reflection: "收获了建议" },
    { day: 18, items: [{ title: "简历改第2版", kind: "skill", skillTitle: "简历项目化表达", focusMinutes: 30 }], reflection: "" },
    { day: 19, items: [{ title: "英语打卡", kind: "self" }], reflection: "" },
    { day: 20, items: [{ title: "代码整理", kind: "self" }], reflection: "细节决定成败" },
    { day: 21, items: [{ title: "文献阅读", kind: "skill", skillTitle: "文献综述撰写 Skill", focusMinutes: 40 }], reflection: "" },
    { day: 22, items: [{ title: "实验设计", kind: "self" }], reflection: "今晚复盘进度" },
  ];
  samples.forEach((s) => {
    const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(s.day).padStart(2, "0")}`;
    state.calendar[key] = {
      items: s.items,
      reflection: s.reflection,
      focusMinutes: s.items.reduce((n, i) => n + (i.focusMinutes || 0), 0),
    };
  });
  state.bond.focusMinutesTotal = Object.values(state.calendar).reduce((n, d) => n + (d.focusMinutes || 0), 0);
  state.bond.practiceCount = Object.values(state.calendar).reduce(
    (n, d) => n + d.items.filter((i) => i.kind === "skill").length,
    0,
  );
  state.bond.xp = 40 + state.bond.practiceCount * 8;
  state.bond.level = Math.max(1, Math.floor(state.bond.xp / 50) + 1);
  return state;
}

function migrate(parsed) {
  const base = defaultState();
  const merged = {
    ...base,
    ...parsed,
    profile: { ...base.profile, ...(parsed.profile || {}) },
    bond: { ...base.bond, ...(parsed.bond || {}) },
    today: { ...base.today, ...(parsed.today || {}) },
    goals: Array.isArray(parsed.goals) && parsed.goals.length ? parsed.goals : base.goals,
    calendar: parsed.calendar || {},
  };
  if (merged.today?.dayKey !== toDayKey()) {
    merged.today = {
      dayKey: toDayKey(),
      goalsRaw: "",
      sourceGoalId: null,
      plan: null,
      messages: [],
      focus: null,
    };
  }
  return merged;
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem("gf-pet-demo-v1");
    if (!raw) return seedCalendar(defaultState());
    return seedCalendar(migrate(JSON.parse(raw)));
  } catch {
    return seedCalendar(defaultState());
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function getPet(state) {
  return PETS[state.profile.petId] || PETS.cat;
}

export function resetDemo() {
  localStorage.removeItem(KEY);
  localStorage.removeItem("gf-pet-demo-v1");
}