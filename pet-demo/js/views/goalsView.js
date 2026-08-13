import { $, el, toast } from "../lib/dom.js";
import { getPet, saveState } from "../lib/store.js";
import { expandGoalToTasks } from "../services/planner.js";

export function mountGoals(state) {
  const pet = getPet(state);
  const root = $("#goals-root");
  if (!root) return;
  let filter = "active";

  function persist() {
    saveState(state);
  }

  function render() {
    const goals = (state.goals || []).filter((g) => (filter === "all" ? true : g.status === filter));
    root.innerHTML = "";

    const head = el("header", { className: "goals-head" });
    const titles = el("div");
    titles.append(
      el("h1", { text: "目标管理" }),
      el("p", { text: "把中长期想办成的事放在这里。需要推进时，一键生成今日计划。" }),
    );
    head.append(titles);

    const layout = el("div", { className: "goals-layout" });
    const board = el("section", { className: "goal-board" });

    const tabs = el("div", { className: "filter-tabs" });
    [
      ["active", "进行中"],
      ["done", "已完成"],
      ["all", "全部"],
    ].forEach(([id, label]) => {
      tabs.append(
        el("button", {
          className: filter === id ? "on" : "",
          type: "button",
          text: label,
          on: {
            click: () => {
              filter = id;
              render();
            },
          },
        }),
      );
    });
    board.append(tabs);

    const composer = el("form", { className: "goal-composer", id: "goal-form" });
    composer.append(
      el("input", { id: "goal-title", maxlength: "40", placeholder: "新目标，例如：高效完成文献综述初稿", required: true }),
      el("textarea", { id: "goal-note", maxlength: "120", placeholder: "补充：截止、手头材料、最怕卡住的点（可选）" }),
      el("div", { className: "composer-actions" }, [
        el("button", { className: "btn btn-pink", type: "submit", text: "添加目标" }),
      ]),
    );
    composer.addEventListener("submit", onCreate);
    board.append(composer);

    if (!goals.length) {
      board.append(el("p", { className: "goal-meta", text: "这一栏还是空的。" }));
    } else {
      goals.forEach((goal) => board.append(renderGoal(goal)));
    }

    const aside = el("aside", { className: "goal-aside" });
    aside.append(
      el("img", { src: pet.image, alt: pet.name }),
      el("p", {
        text: `${pet.name}会记住这些目标。从目标生成的今日计划，适合 Skill 的会自动推荐，不适合的只作为自行完成项。`,
      }),
    );

    layout.append(board, aside);
    root.append(head, layout);
  }

  function renderGoal(goal) {
    const row = el("article", { className: `goal-row${goal.status === "done" ? " done" : ""}` });
    const copy = el("div");
    copy.append(el("p", { className: "goal-title", text: goal.title }));
    copy.append(
      el("p", {
        className: "goal-meta",
        text: goal.note || (goal.status === "done" ? "已完成" : "进行中"),
      }),
    );
    const actions = el("div", { className: "goal-actions" });
    if (goal.status !== "done") {
      actions.append(
        el("button", {
          className: "btn btn-pink",
          type: "button",
          text: "生成今日计划",
          on: { click: () => pushToToday(goal) },
        }),
        el("button", {
          className: "btn btn-ghost",
          type: "button",
          text: "完成",
          on: { click: () => complete(goal) },
        }),
      );
    }
    actions.append(
      el("button", {
        className: "btn btn-ghost",
        type: "button",
        text: "删除",
        on: { click: () => remove(goal) },
      }),
    );
    row.append(copy, actions);
    return row;
  }

  function onCreate(event) {
    event.preventDefault();
    const title = $("#goal-title").value.trim();
    const note = $("#goal-note").value.trim();
    if (!title) {
      toast("先写下目标名称");
      return;
    }
    state.goals = state.goals || [];
    state.goals.unshift({
      id: `goal-${Date.now()}`,
      title,
      note,
      deadline: "",
      status: "active",
      createdAt: Date.now(),
    });
    persist();
    render();
    toast("目标已记下");
  }

  function pushToToday(goal) {
    const result = expandGoalToTasks(goal);
    if (!result.ok) {
      toast(result.error);
      return;
    }
    state.today.goalsRaw = goal.title;
    state.today.sourceGoalId = goal.id;
    state.today.plan = result;
    persist();
    toast("今日计划已生成");
    location.href = "./index.html";
  }

  function complete(goal) {
    goal.status = "done";
    persist();
    render();
  }

  function remove(goal) {
    state.goals = state.goals.filter((g) => g.id !== goal.id);
    persist();
    render();
  }

  render();
}