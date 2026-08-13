import { $, $$, clear, el, toast } from "../lib/dom.js";
import { getPet, saveState } from "../lib/store.js";
import { buildPlan, markItem, planProgress } from "../services/planner.js";
import { recordCompletion } from "../services/calendarAgent.js";
import { createFocusTimer, formatRemain } from "../services/focusTimer.js";

function pushMessage(state, role, content) {
  state.today.messages.push({ role, content, at: Date.now() });
}

function renderFeed(state) {
  const feed = $("#chat-feed");
  if (!feed) return;
  clear(feed);
  state.today.messages.forEach((msg) => {
    feed.append(el("div", { className: `bubble ${msg.role}`, text: msg.content }));
  });
  feed.scrollTop = feed.scrollHeight;
}

function renderPlan(state, handlers) {
  const host = $("#plan-board");
  if (!host) return;
  clear(host);
  const plan = state.today.plan;
  const pet = getPet(state);

  if (!plan) {
    host.append(
      el("div", { className: "plan-panel" }, [
        el("div", { className: "plan-head" }, [
          el("div", {}, [
            el("h3", { className: "display", text: "今日计划" }),
            el("p", { text: "提交目标后会出现在这里" }),
          ]),
        ]),
      ]),
    );
    return;
  }

  const progress = planProgress(plan);
  const list = el("div", { className: "plan-list" });

  plan.items.forEach((item) => {
    const row = el("article", { className: `plan-item${item.status === "done" ? " done" : ""}` });
    const check = el("button", {
      className: "check",
      type: "button",
      "aria-label": "标记完成",
      on: { click: () => handlers.toggleSelf(item) },
    });
    const body = el("div");
    body.append(
      el("p", { className: "plan-title", text: item.title }),
      el("p", { className: "plan-reason", text: item.reason }),
    );

    const actions = el("div", { className: "plan-actions" });
    if (item.kind === "skill" && item.status !== "done") {
      actions.append(
        el("span", { className: "pill pill-pink", text: `可用 Skill · 约${item.tomatoes}番茄` }),
        el("button", {
          className: "btn btn-pink",
          type: "button",
          text: `让${pet.name}用这个`,
          on: { click: () => handlers.startSkill(item) },
        }),
        el("button", {
          className: "btn btn-ghost",
          type: "button",
          text: "不用 Skill，自己做",
          on: { click: () => handlers.forceSelf(item) },
        }),
      );
    } else if (item.kind === "self" && item.status !== "done") {
      actions.append(
        el("span", { className: "pill pill-mute", text: "自行完成" }),
        el("button", {
          className: "btn btn-ink",
          type: "button",
          text: "勾选完成",
          on: { click: () => handlers.completeSelf(item) },
        }),
      );
    } else {
      actions.append(el("span", { className: "pill pill-pink", text: "已完成" }));
    }
    body.append(actions);
    row.append(check, body);
    list.append(row);
  });

  host.append(
    el("div", { className: "plan-panel" }, [
      el("div", { className: "plan-head" }, [
        el("div", {}, [
          el("h3", { className: "display", text: "今日计划" }),
          el("p", { text: `${plan.summary} · 进度 ${progress.done}/${progress.total}` }),
        ]),
        el("button", {
          className: "btn btn-ghost",
          type: "button",
          text: "重排",
          on: { click: () => handlers.rebuild() },
        }),
      ]),
      list,
    ]),
  );
}

function syncPetChrome(state) {
  const pet = getPet(state);
  const name = state.profile.name || "同学";

  const hero = document.getElementById("hero-pet");
  if (hero) {
    hero.src = pet.stageImage || pet.image;
    hero.alt = pet.name;
  }
  const work = document.getElementById("work-pet");
  if (work) {
    work.src = pet.image;
    work.alt = pet.name;
  }
  const avatar = document.getElementById("chat-pet-avatar");
  if (avatar) {
    avatar.src = pet.faceImage || pet.image;
    avatar.alt = pet.name;
  }
  const askFace = document.getElementById("ask-face");
  if (askFace) askFace.src = pet.faceImage || pet.image;

  const askWho = $("#ask-who");
  if (askWho) askWho.textContent = pet.name;
  const submitLabel = $("#goal-submit-label");
  if (submitLabel) submitLabel.textContent = `交给${pet.name}排计划`;
  const chatName = $("#chat-pet-name");
  if (chatName) chatName.textContent = pet.name;
  const chatSub = $("#chat-pet-sub");
  if (chatSub) chatSub.textContent = `${name}的成长搭子 · ${pet.personality}`;

  const focusMin = state.bond.focusMinutesTotal || 0;
  const streak = state.bond.streak || 0;
  const focus = $("#stat-focus");
  if (focus) focus.textContent = String(focusMin || 90);
  const streakEl = $("#stat-streak");
  if (streakEl) streakEl.textContent = String(streak || 12);
}

function setMode(planned) {
  $("#home-page")?.classList.toggle("is-planned", planned);
}

export function mountHomeChat(state) {
  const pet = getPet(state);
  let focusCtrl = null;
  let energy = "中";

  syncPetChrome(state);
  // Prefer goal stage for the home composition; resume work only when focus is mid-flight.
  setMode(Boolean(state.today.focus) || (Boolean(state.today.plan) && location.hash === "#work"));

  if (state.today.goalsRaw) {
    const input = $("#goal-input");
    if (input) input.value = state.today.goalsRaw;
    const count = $("#goal-count");
    if (count) count.textContent = String(state.today.goalsRaw.length);
  }

  function persist() {
    saveState(state);
    syncPetChrome(state);
  }

  function refreshWork() {
    renderFeed(state);
    renderPlan(state, {
      startSkill,
      completeSelf,
      forceSelf,
      toggleSelf: (item) => {
        if (item.kind === "self") completeSelf(item);
      },
      rebuild: () => {
        state.today.plan = null;
        state.today.messages = [];
        persist();
        history.replaceState(null, "", location.pathname + location.search);
        setMode(false);
        toast("已回到目标页，可以重新排计划");
      },
    });
  }

  function submitGoals(raw, meta) {
    const result = buildPlan(raw, meta);
    if (!result.ok) {
      toast(result.error);
      return;
    }
    state.today.goalsRaw = raw;
    state.today.plan = result;
    state.today.messages = [];
    pushMessage(state, "user", raw);
    pushMessage(
      state,
      "assistant",
      pet.voice(`懂了，这仗我接了。${result.summary}。适合用 Skill 的我标出来，其余你自己勾选就好。`),
    );
    persist();
    location.hash = "work";
    setMode(true);
    refreshWork();
    toast("计划已生成");
  }

  function completeSelf(item) {
    if (item.status === "done") return;
    state.today.plan = markItem(state.today.plan, item.id, "done");
    recordCompletion(state, { title: item.title, kind: "self" });
    pushMessage(state, "assistant", pet.voice(`「${item.title}」已记进今天的日历。`));
    persist();
    refreshWork();
  }

  function forceSelf(item) {
    item.kind = "self";
    item.skill = null;
    item.reason = "你选择自行完成";
    persist();
    refreshWork();
  }

  function startSkill(item) {
    if (focusCtrl?.isRunning()) {
      toast("先结束当前专注回合");
      return;
    }
    state.today.plan = markItem(state.today.plan, item.id, "doing");
    state.today.focus = {
      itemId: item.id,
      skillTitle: item.skill?.title,
      title: item.title,
      totalSec: 25 * 60,
    };
    pushMessage(
      state,
      "assistant",
      pet.voice(`开战：正在用「${item.skill.title}」推进「${item.title}」。你可随时补充材料或纠正方向。`),
    );
    pushMessage(state, "assistant", "执行中：梳理要点 → 生成草稿 → 等你确认产出。");
    persist();
    refreshWork();

    const focusBar = $("#focus-bar");
    focusBar?.classList.add("show");
    $("#focus-title").textContent = item.skill.title;
    $("#focus-sub").textContent = item.title;

    focusCtrl = createFocusTimer({
      minutes: 25,
      onTick: (remain) => {
        const total = 25 * 60;
        const p = ((total - remain) / total) * 100;
        $("#focus-ring").style.setProperty("--p", `${p}%`);
        $("#focus-ring").textContent = formatRemain(remain);
      },
      onDone: () => finishFocus(true),
    });
    focusCtrl.start();
  }

  function finishFocus(auto = false) {
    const focus = state.today.focus;
    if (!focus) return;
    const minutes = focusCtrl ? focusCtrl.elapsedMinutes() : 1;
    focusCtrl?.stop();
    focusCtrl = null;
    $("#focus-bar")?.classList.remove("show");

    const item = state.today.plan?.items.find((i) => i.id === focus.itemId);
    if (item) state.today.plan = markItem(state.today.plan, item.id, "done");

    recordCompletion(state, {
      title: focus.title,
      kind: "skill",
      skillTitle: focus.skillTitle,
      focusMinutes: minutes,
    });

    state.today.focus = null;
    pushMessage(
      state,
      "assistant",
      pet.voice(
        auto
          ? `番茄到时。本局专注 +${minutes} 分，成果已写入日历。这轮算走通了。`
          : `收工。本局专注 +${minutes} 分 · 默契 +1。我已把「${focus.title}」记进日历。`,
      ),
    );
    persist();
    refreshWork();
    toast(`专注 +${minutes} 分已入账`);
  }

  /* Goal form */
  const form = $("#goal-form");
  const goalInput = $("#goal-input");
  goalInput?.addEventListener("input", () => {
    $("#goal-count").textContent = String(goalInput.value.length);
  });

  $$("#goal-chips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("on");
      if (chip.dataset.chip === "继续昨天" && chip.classList.contains("on") && !goalInput.value.trim()) {
        goalInput.value = "继续昨天未完成的学习块";
        $("#goal-count").textContent = String(goalInput.value.length);
      }
      if (chip.dataset.chip === "多目标" && chip.classList.contains("on")) {
        goalInput.placeholder = "一行一件事，例如：\n改简历\n写综述大纲\n去图书馆还书";
      }
    });
  });

  $$("#energy-row button").forEach((btn) => {
    btn.addEventListener("click", () => {
      energy = btn.dataset.energy;
      $$("#energy-row button").forEach((b) => b.classList.toggle("on", b === btn));
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const raw = goalInput.value.trim();
    const fear = $("#goal-fear")?.value.trim() || "";
    const chips = $$("#goal-chips .chip.on").map((c) => c.dataset.chip);
    submitGoals(raw, { energy, fear, chips });
  });

  $("#back-to-goals")?.addEventListener("click", () => {
    history.replaceState(null, "", location.pathname + location.search);
    setMode(false);
  });

  $("#focus-pause").onclick = () => {
    if (!focusCtrl) return;
    if (focusCtrl.isPaused()) {
      focusCtrl.resume();
      $("#focus-pause").textContent = "暂停";
    } else {
      focusCtrl.pause();
      $("#focus-pause").textContent = "继续";
    }
  };

  $("#focus-done").onclick = () => finishFocus(false);

  $("#compose-send").onclick = () => {
    const input = $("#compose-input");
    const text = input.value.trim();
    if (!text) return;
    pushMessage(state, "user", text);
    pushMessage(
      state,
      "assistant",
      state.today.focus
        ? pet.voice("收到，我会按你的补充调整这一步产出。")
        : pet.voice("收到。需要重排计划可以点「重排」或「改目标」。"),
    );
    input.value = "";
    persist();
    refreshWork();
  };

  if (state.today.focus || (state.today.plan && location.hash === "#work")) refreshWork();
}