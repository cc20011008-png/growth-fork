import { SKILLS, SELF_COMPLETE_HINTS } from "../config/skills.js";

function splitGoals(raw) {
  return raw
    .split(/[\n；;]+/)
    .map((s) => s.replace(/^[\d、.．\-\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 8);
}

function scoreSkill(text, skill) {
  return skill.keywords.reduce((score, kw) => (text.includes(kw) ? score + 1 : score), 0);
}

function isSelfComplete(text) {
  return SELF_COMPLETE_HINTS.some((h) => text.includes(h));
}

export function classifyItem(title, index = 0) {
  const id = `item-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`;
  if (isSelfComplete(title)) {
    return {
      id,
      title,
      status: "todo",
      kind: "self",
      reason: "更像线下/事务动作，自己勾选完成即可",
      skill: null,
      tomatoes: 0,
    };
  }

  const ranked = SKILLS
    .map((skill) => ({ skill, score: scoreSkill(title, skill) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    const soft = /写|学|复习|作业|报告|计划|整理/.test(title);
    if (soft) {
      const skill = SKILLS.find((s) => s.id === "study-outline");
      return {
        id,
        title,
        status: "todo",
        kind: "skill",
        reason: "适合用流程型 Skill 拆开推进",
        skill: { id: skill.id, title: skill.title, blurb: skill.blurb },
        tomatoes: skill.tomatoes,
      };
    }
    return {
      id,
      title,
      status: "todo",
      kind: "self",
      reason: "暂无匹配 Skill，先自行推进",
      skill: null,
      tomatoes: 0,
    };
  }

  const best = ranked[0].skill;
  return {
    id,
    title,
    status: "todo",
    kind: "skill",
    reason: `匹配「${best.title}」`,
    skill: { id: best.id, title: best.title, blurb: best.blurb },
    tomatoes: best.tomatoes,
  };
}

/**
 * Build a day plan with skill gate.
 * @param {string} raw
 * @param {{ energy?: string, fear?: string, sourceGoalId?: string }} meta
 */
export function buildPlan(raw, meta = {}) {
  const lines = splitGoals(raw);
  if (!lines.length) {
    return {
      ok: false,
      error: "先写下一件今天最想办成的事。",
    };
  }

  const items = lines.map((title, index) => classifyItem(title, index));

  return {
    ok: true,
    createdAt: Date.now(),
    meta,
    summary: `已排好 ${items.length} 项 · 其中 ${items.filter((i) => i.kind === "skill").length} 项可用 Skill`,
    items,
  };
}

const GOAL_PRESETS = {
  "goal-lit-review": "整理8篇论文主题\n写综述大纲第一节\n去图书馆还书\n晚上复盘今日进度",
  "goal-resume": "列出三段实习经历\n改一版实习简历\n去打印店打印简历",
};

export function expandGoalToTasks(goal) {
  const raw = GOAL_PRESETS[goal.id] || [goal.title, goal.note].filter(Boolean).join("\n");
  return buildPlan(raw, { sourceGoalId: goal.id });
}

export function addPlanItem(plan, title) {
  const item = classifyItem(title.trim());
  if (!plan) {
    return {
      ok: true,
      createdAt: Date.now(),
      meta: {},
      summary: "已排好 1 项",
      items: [item],
    };
  }
  return {
    ...plan,
    items: [...plan.items, item],
    summary: `已排好 ${plan.items.length + 1} 项 · 其中 ${[...plan.items, item].filter((i) => i.kind === "skill").length} 项可用 Skill`,
  };
}

export function removePlanItem(plan, itemId) {
  if (!plan) return plan;
  return { ...plan, items: plan.items.filter((item) => item.id !== itemId) };
}

export function markItem(plan, itemId, status) {
  if (!plan) return plan;
  return {
    ...plan,
    items: plan.items.map((item) => (item.id === itemId ? { ...item, status } : item)),
  };
}

export function planProgress(plan) {
  if (!plan?.items?.length) return { done: 0, total: 0 };
  const done = plan.items.filter((i) => i.status === "done").length;
  return { done, total: plan.items.length };
}