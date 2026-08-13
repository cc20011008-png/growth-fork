import { $, el, toast } from "../lib/dom.js";
import { getPet, saveState } from "../lib/store.js";
import { addPlanItem, buildPlan, markItem, planProgress, removePlanItem } from "../services/planner.js";
import { recordCompletion } from "../services/calendarAgent.js";
import { createFocusTimer, formatRemain } from "../services/focusTimer.js";

const HEART = `<svg class="heart" viewBox="0 0 24 24" width="14" height="14" fill="#FF4F9A" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z"/></svg>`;
const SEND = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l16-8-6 18-2.5-7L4 12z"/></svg>`;
const CHECK = `<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>`;

function sourceGoal(state) {
  return (state.goals || []).find((g) => g.id === state.today.sourceGoalId);
}

export function mountTodayPlan(state) {
  const pet = getPet(state);
  let focusCtrl = null;
  const root = $("#plan-root");
  if (!root) return;

  function persist() {
    saveState(state);
  }

  function render() {
    const plan = state.today.plan;
    const progress = planProgress(plan);
    const goal = sourceGoal(state);
    const hasPlan = Boolean(plan?.items?.length);
    const subtitle = hasPlan
      ? goal
        ? `基于你的目标「${goal.title}」，已为你生成今日计划清单`
        : state.today.goalsRaw
          ? `基于你的目标「${state.today.goalsRaw.slice(0, 18)}」，已为你生成今日计划清单`
          : `${pet.name}已排好今日清单，一项项打就行`
      : "先加一条待办，或让宠物根据目标生成今日计划";

    root.innerHTML = "";

    const head = el("header", { className: "plan-head" });
    const titles = el("div");
    const h1 = el("h1");
    h1.innerHTML = `<span class="plan-check">${CHECK}</span>${hasPlan ? "计划已生成" : "今日计划"}`;
    titles.append(h1, el("p", { text: subtitle }));
    head.append(
      titles,
      el("div", { className: "progress-pill", text: `进度 ${progress.done}/${progress.total || 0}` }),
    );

    const line = el("div", { className: "pet-line" });
    line.append(el("img", { src: pet.faceImage || pet.image, alt: pet.name }));
    const bubble = el("div", { className: "pet-bubble" });
    bubble.innerHTML = hasPlan
      ? `今日计划已排好，一项项打就行 ${HEART}`
      : `把今天要做的事丢给我，或自己加一条待办 ${HEART}`;
    line.append(bubble);

    const stage = el("div", { className: "plan-stage" });
    const card = el("section", { className: "plan-card" });
    const cardHead = el("div", { className: "plan-card-head" });
    cardHead.append(el("h2", { text: "今日计划清单" }));
    card.append(cardHead);

    const focusBar = el("div", { className: `focus-inline${state.today.focus ? " show" : ""}`, id: "focus-inline" });
    focusBar.append(
      el("b", { id: "focus-clock", text: "25:00" }),
      el("span", { id: "focus-label", text: state.today.focus?.title || "专注中" }),
      el("button", { className: "ghost-mini", type: "button", text: "暂停", id: "focus-pause" }),
      el("button", { className: "use-skill", type: "button", text: "打完", id: "focus-done" }),
    );
    card.append(focusBar);

    const add = el("div", { className: "add-row" });
    add.append(
      el("input", {
        id: "todo-input",
        placeholder: "添加今日待办，例如：去图书馆还书",
        maxlength: "80",
      }),
      el("button", {
        type: "button",
        text: "添加",
        on: { click: addTodo },
      }),
    );
    card.append(add);

    const rows = el("div", { className: "plan-rows" });
    if (!hasPlan) {
      rows.append(el("div", { className: "plan-empty", text: "还没有待办。写一条加上，或从「目标管理」推进到今天。" }));
    } else {
      plan.items.forEach((item, index) => rows.append(renderRow(item, index)));
    }
    card.append(rows);

    const mascot = el("img", {
      className: "plan-mascot",
      src: pet.image,
      alt: "",
    });
    stage.append(card, mascot);

    const chat = el("form", { className: "plan-chat", id: "plan-chat" });
    chat.append(
      el("input", {
        id: "chat-input",
        placeholder: `和${pet.name}聊聊你的计划吧～`,
        autocomplete: "off",
      }),
      el("button", { className: "send-orb", type: "submit", "aria-label": "发送", html: SEND }),
    );
    chat.addEventListener("submit", onChat);

    root.append(head, line, stage, chat);

    $("#todo-input")?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addTodo();
      }
    });

    $("#focus-pause")?.addEventListener("click", togglePause);
    $("#focus-done")?.addEventListener("click", () => finishFocus(false));

    if (focusCtrl?.isRunning()) {
      $("#focus-inline")?.classList.add("show");
    }
  }

  function renderRow(item, index) {
    const done = item.status === "done";
    const row = el("article", { className: `plan-row${done ? " done" : ""}` });
    const idx = el("button", {
      className: `idx${done ? " done" : item.kind === "self" ? " open" : ""}`,
      type: "button",
      text: done || item.kind === "skill" ? String(index + 1) : "",
      "aria-label": done ? "已完成" : "标记完成",
      on: { click: () => toggleItem(item) },
    });
    const body = el("div");
    body.append(el("p", { className: "row-title", text: item.title }));
    const actions = el("div", { className: "row-actions" });
    if (item.kind === "skill" && !done) {
      actions.append(
        el("span", { className: "tag-skill", text: "可用 Skill" }),
        el("button", {
          className: "use-skill",
          type: "button",
          text: `用${item.skill?.title?.replace(/ Skill$/, "") || "Skill"}`,
          on: { click: () => startSkill(item) },
        }),
      );
    } else if (item.kind === "self" && !done) {
      actions.append(el("span", { className: "tag-self", text: "自行完成" }));
    } else if (done) {
      actions.append(el("span", { className: "tag-skill", text: "已完成" }));
    }
    actions.append(
      el("button", {
        className: "ghost-mini",
        type: "button",
        text: "删除",
        on: { click: () => removeItem(item) },
      }),
    );
    row.append(idx, body, actions);
    return row;
  }

  function addTodo() {
    const input = $("#todo-input");
    const title = input?.value.trim();
    if (!title) {
      toast("先写一条待办");
      return;
    }
    state.today.plan = addPlanItem(state.today.plan, title);
    input.value = "";
    persist();
    render();
    toast("已加入今日清单");
  }

  function toggleItem(item) {
    if (item.status === "done") {
      state.today.plan = markItem(state.today.plan, item.id, "todo");
      persist();
      render();
      return;
    }
    state.today.plan = markItem(state.today.plan, item.id, "done");
    recordCompletion(state, {
      title: item.title,
      kind: item.kind,
      skillTitle: item.skill?.title,
      focusMinutes: 0,
    });
    persist();
    render();
  }

  function removeItem(item) {
    state.today.plan = removePlanItem(state.today.plan, item.id);
    if (!state.today.plan.items.length) state.today.plan = null;
    persist();
    render();
  }

  function startSkill(item) {
    if (focusCtrl?.isRunning()) {
      toast("先结束当前专注回合");
      return;
    }
    state.today.plan = markItem(state.today.plan, item.id, "doing");
    state.today.focus = { itemId: item.id, skillTitle: item.skill?.title, title: item.title };
    persist();
    render();
    focusCtrl = createFocusTimer({
      minutes: 25,
      onTick: (remain) => {
        const clock = $("#focus-clock");
        if (clock) clock.textContent = formatRemain(remain);
      },
      onDone: () => finishFocus(true),
    });
    focusCtrl.start();
    toast(`${pet.name}开始用「${item.skill.title}」`);
  }

  function togglePause() {
    if (!focusCtrl) return;
    if (focusCtrl.isPaused()) {
      focusCtrl.resume();
      $("#focus-pause").textContent = "暂停";
    } else {
      focusCtrl.pause();
      $("#focus-pause").textContent = "继续";
    }
  }

  function finishFocus(auto) {
    const focus = state.today.focus;
    if (!focus) return;
    const minutes = focusCtrl ? focusCtrl.elapsedMinutes() : 1;
    focusCtrl?.stop();
    focusCtrl = null;
    const item = state.today.plan?.items.find((i) => i.id === focus.itemId);
    if (item) state.today.plan = markItem(state.today.plan, item.id, "done");
    recordCompletion(state, {
      title: focus.title,
      kind: "skill",
      skillTitle: focus.skillTitle,
      focusMinutes: minutes,
    });
    state.today.focus = null;
    persist();
    render();
    toast(auto ? `番茄到时 · +${minutes} 分` : `收工 · 专注 +${minutes} 分`);
  }

  function onChat(event) {
    event.preventDefault();
    const input = $("#chat-input");
    const text = input.value.trim();
    if (!text) return;
    if (/^(加|帮我加|加上|待办)/.test(text) || text.length < 24) {
      const title = text.replace(/^(加|帮我加|加上|待办)[：:]?\s*/, "");
      state.today.plan = addPlanItem(state.today.plan, title);
      input.value = "";
      persist();
      render();
      toast(`${pet.name}已把「${title}」写进清单`);
      return;
    }
    const result = buildPlan(text, {});
    if (result.ok) {
      state.today.goalsRaw = text;
      state.today.plan = result;
      input.value = "";
      persist();
      render();
      toast("计划已生成");
      return;
    }
    toast(result.error);
  }

  render();
}