import { toDayKey } from "../lib/date.js";

export function ensureDay(state, dayKey = toDayKey()) {
  if (!state.calendar[dayKey]) {
    state.calendar[dayKey] = { items: [], reflection: "", focusMinutes: 0 };
  }
  return state.calendar[dayKey];
}

export function recordCompletion(state, payload) {
  const dayKey = payload.dayKey || toDayKey();
  const day = ensureDay(state, dayKey);
  day.items.push({
    title: payload.title,
    kind: payload.kind,
    skillTitle: payload.skillTitle,
    focusMinutes: payload.focusMinutes || 0,
  });
  day.focusMinutes += payload.focusMinutes || 0;

  state.bond.focusMinutesTotal += payload.focusMinutes || 0;
  if (payload.kind === "skill") state.bond.practiceCount += 1;
  state.bond.xp += payload.kind === "skill" ? 12 : 5;
  state.bond.level = Math.max(1, Math.floor(state.bond.xp / 50) + 1);

  const today = toDayKey();
  if (state.bond.lastActiveDay !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (state.bond.lastActiveDay === toDayKey(yesterday)) state.bond.streak += 1;
    else state.bond.streak = 1;
    state.bond.lastActiveDay = today;
  }

  unlockAchievements(state);
  return state;
}

export function saveReflection(state, dayKey, text) {
  const day = ensureDay(state, dayKey);
  day.reflection = text.trim();
  return state;
}

function unlockAchievements(state) {
  const bag = new Set(state.bond.achievements);
  if (state.bond.streak >= 3) bag.add("streak-3");
  if (state.bond.streak >= 7) bag.add("streak-7");
  if (state.bond.practiceCount >= 1) bag.add("first-skill");
  if (state.bond.practiceCount >= 10) bag.add("ten-battles");
  if (state.bond.focusMinutesTotal >= 300) bag.add("focus-5h");
  state.bond.achievements = [...bag];
}

export const ACHIEVEMENT_META = {
  "streak-3": { title: "连续开战 3 天", blurb: "习惯的火苗点着了" },
  "streak-7": { title: "连续开战 7 天", blurb: "这周你很稳" },
  "first-skill": { title: "Skill 首通", blurb: "第一次和宠物一起跑通 Skill" },
  "ten-battles": { title: "第 10 场共斗", blurb: "默契正在长出来" },
  "focus-5h": { title: "专注满 5 小时", blurb: "时长是副产物，战绩是真的" },
};

/**
 * Agent monthly narrative from calendar data.
 */
export function buildMonthlyReport(state, year, monthIndex, petName) {
  const prefix = `${year}-${String(monthIndex + 1).padStart(2, "0")}-`;
  const days = Object.entries(state.calendar).filter(([k]) => k.startsWith(prefix));
  const focus = days.reduce((n, [, d]) => n + (d.focusMinutes || 0), 0);
  const battles = days.reduce((n, [, d]) => n + d.items.length, 0);
  const skillUses = days.reduce((n, [, d]) => n + d.items.filter((i) => i.kind === "skill").length, 0);
  const reflections = days.filter(([, d]) => d.reflection).length;

  const skillCount = {};
  days.forEach(([, d]) => {
    d.items.forEach((item) => {
      if (item.skillTitle) skillCount[item.skillTitle] = (skillCount[item.skillTitle] || 0) + 1;
    });
  });
  const topSkill = Object.entries(skillCount).sort((a, b) => b[1] - a[1])[0];

  const highlights = days
    .flatMap(([key, d]) => d.items.map((item) => ({ key, ...item })))
    .slice(-3)
    .reverse();

  const narrative = battles
    ? `${petName}看了一整月：你一共留下 ${battles} 场记录，专注约 ${Math.round(focus / 60 * 10) / 10} 小时。不是打卡好看，是这些仗真的打过。`
    : `${petName}还在等你的第一场月度战绩。从今日目标开始，我们一项项来。`;

  return {
    year,
    monthIndex,
    focusMinutes: focus,
    battles,
    skillUses,
    reflections,
    topSkill: topSkill ? { title: topSkill[0], count: topSkill[1] } : null,
    highlights,
    narrative,
    tip: skillUses < battles / 2
      ? "有些事适合自己做，不必硬套 Skill——你已经分得很清楚。"
      : "下个月可以试着把「有效实践」再抬一点：跑通比挂时长更重要。",
  };
}