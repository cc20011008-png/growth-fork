const QUOTE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 18c-2.4 0-4.2-1.9-4.2-4.5C3 9.6 5.8 6.2 10 5.2l.7 1.6C8.2 7.6 6.6 9.4 6.4 11.4c.5-.4 1.2-.6 2-.6 1.8 0 3.1 1.2 3.1 3 0 1.9-1.5 3.2-4.3 3.2zm9.5 0c-2.4 0-4.2-1.9-4.2-4.5 0-3.9 2.8-7.3 7-8.3l.7 1.6c-2.5.8-4.1 2.6-4.3 4.6.5-.4 1.2-.6 2-.6 1.8 0 3.1 1.2 3.1 3 0 1.9-1.5 3.2-4.3 3.2z"/></svg>`;

const STORE_KEY = "gf-calendar-v1";

const SEED = {
  "2026-08-01": { items: [{ title: "文献阅读", kind: "skill" }], reflection: "理清了研究缺口" },
  "2026-08-02": { items: [{ title: "实验设计", kind: "self" }], reflection: "" },
  "2026-08-03": { items: [{ title: "代码整理", kind: "self" }], reflection: "细节决定成败" },
  "2026-08-04": { items: [{ title: "英语打卡", kind: "self" }], reflection: "" },
  "2026-08-05": { items: [{ title: "文献阅读", kind: "skill" }, { title: "组会准备", kind: "self" }], reflection: "收获了建议" },
  "2026-08-06": { items: [{ title: "PPT制作", kind: "self" }], reflection: "" },
  "2026-08-07": { items: [{ title: "综述大纲", kind: "skill" }], reflection: "结构比堆材料重要" },
  "2026-08-08": { items: [{ title: "去图书馆还书", kind: "self" }], reflection: "" },
  "2026-08-09": { items: [{ title: "简历改第1版", kind: "skill" }], reflection: "" },
  "2026-08-10": { items: [{ title: "文献阅读", kind: "skill" }], reflection: "记下三处可引用" },
  "2026-08-11": { items: [{ title: "冷邮件草稿", kind: "skill" }], reflection: "" },
  "2026-08-12": { items: [{ title: "实验设计", kind: "self" }], reflection: "变量先写清" },
  "2026-08-13": { items: [{ title: "代码整理", kind: "self" }], reflection: "" },
  "2026-08-14": { items: [{ title: "英语打卡", kind: "self" }], reflection: "连续打卡有感觉" },
  "2026-08-15": { items: [{ title: "文献阅读", kind: "skill" }], reflection: "理清了研究缺口" },
  "2026-08-16": { items: [{ title: "综述第一节", kind: "skill" }], reflection: "" },
  "2026-08-17": { items: [{ title: "组会纪要", kind: "self" }], reflection: "收获了建议" },
  "2026-08-18": { items: [{ title: "简历改第2版", kind: "skill" }], reflection: "" },
  "2026-08-19": { items: [{ title: "英语打卡", kind: "self" }], reflection: "" },
  "2026-08-20": { items: [{ title: "代码整理", kind: "self" }], reflection: "细节决定成败" },
  "2026-08-21": { items: [{ title: "文献阅读", kind: "skill" }], reflection: "" },
  "2026-08-22": { items: [{ title: "实验设计", kind: "self" }], reflection: "今晚复盘进度" },
  "2026-08-23": { items: [{ title: "PPT制作", kind: "self" }], reflection: "" },
  "2026-08-24": { items: [{ title: "文献阅读", kind: "skill" }], reflection: "理清了研究缺口" },
  "2026-08-25": { items: [{ title: "英语打卡", kind: "self" }], reflection: "收获了建议" },
  "2026-08-26": { items: [{ title: "代码整理", kind: "self" }], reflection: "细节决定成败" },
  "2026-08-27": { items: [{ title: "组会准备", kind: "self" }], reflection: "" },
  "2026-08-28": { items: [{ title: "文献阅读", kind: "skill" }], reflection: "" },
  "2026-08-29": { items: [{ title: "实验设计", kind: "self" }], reflection: "" },
  "2026-08-30": { items: [{ title: "综述大纲", kind: "skill" }], reflection: "" },
  "2026-08-31": { items: [{ title: "英语打卡", kind: "self" }], reflection: "" },
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function toDayKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDayKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function monthGrid(year, monthIndex) {
  const first = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startWeekday = (first.getDay() + 6) % 7;
  const cells = [];
  const prevDays = new Date(year, monthIndex, 0).getDate();
  for (let i = startWeekday - 1; i >= 0; i -= 1) {
    const date = new Date(year, monthIndex - 1, prevDays - i);
    cells.push({ date, key: toDayKey(date), outside: true });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, monthIndex, day);
    cells.push({ date, key: toDayKey(date), outside: false });
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const date = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1);
    cells.push({ date, key: toDayKey(date), outside: true });
  }
  return { year, monthIndex, cells, label: `${year}年${monthIndex + 1}月` };
}

function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORE_KEY, JSON.stringify(notes));
}

function dayData(key, notes) {
  const seed = SEED[key] || { items: [], reflection: "" };
  return {
    items: seed.items,
    reflection: notes[key] ?? seed.reflection,
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function toast(text) {
  const el = document.getElementById("toast");
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 1600);
}

function kindLabel(kind) {
  return kind === "skill" ? "Skill 战绩 · 自动记录" : "自行完成 · 自动记录";
}

function formatDayLabel(key) {
  const d = parseDayKey(key);
  const week = ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
  return `${d.getMonth() + 1}月${d.getDate()}日 周${week}`;
}

const now = new Date();
let year = now.getFullYear();
let monthIndex = now.getMonth();
let selected = toDayKey(now);
let sheetOpen = false;
const notes = loadNotes();

function renderMonth() {
  const meta = monthGrid(year, monthIndex);
  document.getElementById("cal-month-label").textContent = meta.label;
  const grid = document.getElementById("cal-grid");
  grid.innerHTML = "";
  meta.cells.forEach((cell) => {
    const data = dayData(cell.key, notes);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "day-cell";
    if (cell.outside) btn.classList.add("outside");
    if (cell.key === toDayKey(now)) btn.classList.add("today");
    if (cell.key === selected) btn.classList.add("selected");
    btn.innerHTML = `<span class="num">${cell.date.getDate()}</span>`;
    data.items.slice(0, 2).forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "chip-mini";
      chip.textContent = item.title;
      btn.append(chip);
    });
    if (data.reflection) {
      const insight = document.createElement("span");
      insight.className = "insight";
      insight.innerHTML = `${QUOTE_ICON}<span></span>`;
      insight.querySelector("span").textContent = data.reflection;
      btn.append(insight);
    }
    btn.addEventListener("click", () => {
      selected = cell.key;
      sheetOpen = true;
      renderMonth();
      renderDay();
    });
    grid.append(btn);
  });
}

function renderDay() {
  const sheet = document.getElementById("day-sheet");
  if (!sheetOpen) {
    sheet.classList.remove("show");
    sheet.innerHTML = "";
    return;
  }
  const data = dayData(selected, notes);
  sheet.classList.add("show");
  const list = data.items.length
    ? data.items
        .map(
          (item) =>
            `<article><b>${escapeHtml(item.title)}</b><span>${kindLabel(item.kind)}</span></article>`,
        )
        .join("")
    : `<article><b>暂无战绩</b><span>完成学习后，小猫会把记录写进这一天</span></article>`;
  sheet.innerHTML = `
    <div>
      <h2>${formatDayLabel(selected)}</h2>
      <p class="sub">小猫已根据学习自动更新${data.items.length ? ` · ${data.items.length} 项` : ""}</p>
      <div class="day-items">${list}</div>
    </div>
    <div>
      <h2>学习感悟</h2>
      <p class="sub">格子里的粉字来自你写下的这一句</p>
      <textarea id="reflection-input" placeholder="写一句今天的感受、卡点或收获"></textarea>
      <div class="day-actions">
        <button class="btn-pink" type="button" id="save-reflection">保存感悟</button>
      </div>
    </div>
  `;
  const area = document.getElementById("reflection-input");
  area.value = data.reflection || "";
  document.getElementById("save-reflection").onclick = () => {
    notes[selected] = area.value.trim();
    saveNotes(notes);
    toast("感悟已保存");
    renderMonth();
    renderDay();
  };
}

document.getElementById("cal-prev").onclick = () => {
  monthIndex -= 1;
  if (monthIndex < 0) {
    monthIndex = 11;
    year -= 1;
  }
  renderMonth();
};

document.getElementById("cal-next").onclick = () => {
  monthIndex += 1;
  if (monthIndex > 11) {
    monthIndex = 0;
    year += 1;
  }
  renderMonth();
};

document.getElementById("cal-today").onclick = () => {
  year = now.getFullYear();
  monthIndex = now.getMonth();
  selected = toDayKey(now);
  renderMonth();
  renderDay();
};

renderMonth();
renderDay();
