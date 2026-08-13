import { $, clear, el, toast } from "../lib/dom.js";
import { formatDayLabel, monthMeta, toDayKey } from "../lib/date.js";
import { saveState, getPet } from "../lib/store.js";
import { ensureDay, saveReflection } from "../services/calendarAgent.js";

export function mountCalendarPage(state) {
  const now = new Date();
  let year = now.getFullYear();
  let monthIndex = now.getMonth();
  let selected = toDayKey();

  const pet = getPet(state);
  $("#cal-pet-note").textContent = `${pet.name}根据你的学习自动更新格子里的战绩`;

  function renderMonth() {
    const meta = monthMeta(year, monthIndex);
    $("#cal-month-label").textContent = meta.label;
    const grid = $("#cal-grid");
    clear(grid);

    for (let i = 0; i < meta.startWeekday; i += 1) {
      grid.append(el("div", { className: "day-cell empty" }));
    }

    for (let day = 1; day <= meta.daysInMonth; day += 1) {
      const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const data = state.calendar[key];
      const isToday = key === toDayKey();
      const btn = el("button", {
        className: `day-cell${isToday ? " today" : ""}${selected === key ? " selected" : ""}`,
        type: "button",
        on: {
          click: () => {
            selected = key;
            renderMonth();
            renderDay();
          },
        },
      });
      btn.append(el("span", { className: "num", text: String(day) }));
      (data?.items || []).slice(0, 2).forEach((item) => {
        btn.append(el("span", { className: "chip-mini", text: item.title }));
      });
      if (data?.reflection) btn.append(el("span", { className: "note-dot", title: "有学习感悟" }));
      grid.append(btn);
    }
  }

  function renderDay() {
    const panel = $("#day-panel");
    const day = ensureDay(state, selected);
    clear(panel);
    panel.append(
      el("h2", { className: "display", text: formatDayLabel(selected) }),
      el("p", {
        className: "sub",
        text: day.items.length
          ? `${pet.name}已记录 ${day.items.length} 项 · 专注 ${day.focusMinutes || 0} 分`
          : `${pet.name}这天还没有战绩，去今日对话打一场吧`,
      }),
    );

    const list = el("div", { className: "day-items" });
    if (!day.items.length) {
      list.append(el("article", {}, [el("b", { text: "暂无记录" }), el("span", { text: "完成计划项后会自动出现在这里" })]));
    } else {
      day.items.forEach((item) => {
        list.append(
          el("article", {}, [
            el("b", { text: item.title }),
            el("span", {
              text:
                item.kind === "skill"
                  ? `Skill · ${item.skillTitle || "已调用"} · ${item.focusMinutes || 0} 分`
                  : "自行完成",
            }),
          ]),
        );
      });
    }
    panel.append(list);

    panel.append(el("h3", { style: { fontSize: "14px", margin: "0 0 8px" }, text: "今日学习感悟" }));
    const area = el("textarea", {
      id: "reflection-input",
      placeholder: "写一句今天的感受、卡点或收获…",
    });
    area.value = day.reflection || "";
    panel.append(area);

    const actions = el("div", { className: "day-actions" });
    actions.append(
      el("button", {
        className: "btn btn-pink",
        type: "button",
        text: "保存感悟",
        on: {
          click: () => {
            saveReflection(state, selected, area.value);
            saveState(state);
            toast("感悟已保存");
            renderMonth();
          },
        },
      }),
    );
    panel.append(actions);
  }

  $("#cal-prev").onclick = () => {
    monthIndex -= 1;
    if (monthIndex < 0) {
      monthIndex = 11;
      year -= 1;
    }
    renderMonth();
  };
  $("#cal-next").onclick = () => {
    monthIndex += 1;
    if (monthIndex > 11) {
      monthIndex = 0;
      year += 1;
    }
    renderMonth();
  };

  renderMonth();
  renderDay();
}