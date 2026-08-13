const STORE_KEY = "gf-daily-plan-v3";
const DEMO_TODAY = new Date(2026, 7, 22);
const QUOTE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 18c-2.4 0-4.2-1.9-4.2-4.5C3 9.6 5.8 6.2 10 5.2l.7 1.6C8.2 7.6 6.6 9.4 6.4 11.4c.5-.4 1.2-.6 2-.6 1.8 0 3.1 1.2 3.1 3 0 1.9-1.5 3.2-4.3 3.2zm9.5 0c-2.4 0-4.2-1.9-4.2-4.5 0-3.9 2.8-7.3 7-8.3l.7 1.6c-2.5.8-4.1 2.6-4.3 4.6.5-.4 1.2-.6 2-.6 1.8 0 3.1 1.2 3.1 3 0 1.9-1.5 3.2-4.3 3.2z"/></svg>`;

const SEED = {
  "2026-08-01": { tasks: ["精读两篇升学焦虑文献", "整理可引用原句"], note: "理清了研究缺口" },
  "2026-08-02": { tasks: ["写清实验自变量与对照", "列出可测变量"], note: "" },
  "2026-08-03": { tasks: ["把问卷字段先清洗一遍"], note: "细节决定成败" },
  "2026-08-04": { tasks: ["去打印店取材料", "英语口语打卡"], note: "" },
  "2026-08-05": { tasks: ["组会 PPT 提纲", "文献精读第三篇"], note: "收获了建议" },
  "2026-08-06": { tasks: ["改简历实习经历第1版", "补充项目量化结果"], note: "思路更清晰了" },
  "2026-08-07": { tasks: ["综述大纲第一节", "对照研究缺口"], note: "结构比堆材料重要" },
  "2026-08-08": { tasks: ["去图书馆还书", "教学楼占座", "取快递"], note: "" },
  "2026-08-09": { tasks: ["给导师发冷邮件草稿", "准备跟进话术"], note: "" },
  "2026-08-10": { tasks: ["精读方法论文献", "摘录缺口对照表"], note: "记下三处可引用" },
  "2026-08-11": { tasks: ["食堂吃饭", "宿舍洗衣", "英语打卡"], note: "" },
  "2026-08-12": { tasks: ["实验设计：样本与流程", "检查变量是否可测"], note: "变量先写清" },
  "2026-08-13": { tasks: ["问卷异常值排查", "统计描述先出一版"], note: "发现了异常点" },
  "2026-08-14": { tasks: ["线下交材料盖章", "去图书馆占座"], note: "连续打卡有感觉" },
  "2026-08-15": { tasks: ["文献综述论点整理", "研究问题再收敛"], note: "理清了研究缺口" },
  "2026-08-16": { tasks: ["产品实习面试模拟", "准备自我介绍60秒"], note: "" },
  "2026-08-17": { tasks: ["组会发言提纲", "整理组会纪要"], note: "收获了建议" },
  "2026-08-18": { tasks: ["简历改第2版", "把社团经历写成STAR"], note: "思路更清晰了" },
  "2026-08-19": { tasks: ["取快递", "晚上去跑步", "宿舍打扫"], note: "" },
  "2026-08-20": { tasks: ["冷邮件跟进第二封", "核对简历附件"], note: "细节决定成败" },
  "2026-08-21": { tasks: ["精读文献两篇", "写实验设计草图"], note: "" },
  "2026-08-22": {
    tasks: [
      "精读两篇升学焦虑文献并标缺口",
      "把实验自变量与对照写清楚",
      "改简历实习经历第2版",
      "给潜在导师写冷邮件草稿",
      "写今日学习复盘",
      "去图书馆还书",
      "宿舍打扫",
      "晚上去跑步",
      "取快递",
    ],
    note: "今晚复盘进度",
  },
  "2026-08-23": { tasks: ["组会 PPT 制作", "食堂吃饭后散步", "线下交材料盖章"], note: "" },
  "2026-08-24": { tasks: ["文献综述第二节", "摘录可引用原句"], note: "理清了研究缺口" },
  "2026-08-25": { tasks: ["面试自我介绍再练一遍", "英语打卡"], note: "收获了建议" },
  "2026-08-26": { tasks: ["问卷数据清洗", "出一版描述统计"], note: "细节决定成败" },
  "2026-08-27": { tasks: ["组会发言提纲", "文献精读"], note: "发现了异常点" },
  "2026-08-28": { tasks: ["教学楼占座", "取快递", "洗衣"], note: "" },
  "2026-08-29": { tasks: ["研究问题再收敛", "英语打卡"], note: "思路更清晰了" },
  "2026-08-30": { tasks: ["综述大纲收尾", "对照缺口清单"], note: "" },
  "2026-08-31": { tasks: ["去跑步", "宿舍打扫"], note: "收获很大" },
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

function shiftDay(key, delta) {
  const date = parseDayKey(key);
  date.setDate(date.getDate() + delta);
  return toDayKey(date);
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

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveStore(store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function seedTodos(key) {
  const titles = SEED[key]?.tasks || [];
  const todayKey = toDayKey(DEMO_TODAY);
  return titles.map((text, i) => ({
    id: `${key}-${i}`,
    text,
    done: key < todayKey,
  }));
}

function dayRecord(store, key) {
  const saved = store[key];
  return {
    todos: saved?.todos && Array.isArray(saved.todos) ? saved.todos : seedTodos(key),
    note: saved?.note ?? SEED[key]?.note ?? "",
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
  const el = document.getElementById("cal-toast");
  if (!el) return;
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 1600);
}

function formatDayLabel(key) {
  const d = parseDayKey(key);
  const week = ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 周${week}`;
}

function uid() {
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const SKILL_CATALOG = [
  {
    id: "literature-review",
    cmd: "/literature-review",
    title: "文献综述撰写 Skill",
    type: "单 Skill",
    badge: "可运行",
    blurb: "把主题、方法与研究缺口收成可写大纲，精读后直接开写。",
    image: "assets/skill-icon-literature.png?v=ls2",
    avatar: "assets/avatar-student.png",
    author: "顾言 · 北大 2024",
    role: "科研写作方向认证专家",
    users: "4,218",
    rate: "81%",
    forks: "128",
    keywords: ["文献", "综述", "论文", "精读", "缺口", "引用", "升学焦虑"],
  },
  {
    id: "paper-notes",
    cmd: "/paper-notes",
    title: "论文精读笔记 Skill",
    type: "单 Skill",
    badge: "可运行",
    blurb: "按主题 / 方法 / 结论 / 缺口摘录，标出可直接引用的原句。",
    image: "assets/skill-icon-paper-notes.png?v=ls2",
    avatar: "assets/avatar-student.png",
    author: "顾言 · 北大 2024",
    role: "精读与摘录助手",
    users: "3,540",
    rate: "82%",
    forks: "104",
    keywords: ["精读", "文献", "笔记", "摘录", "原句", "引用", "阅读"],
  },
  {
    id: "research",
    cmd: "/research-question",
    title: "研究问题梳理 Skill",
    type: "单 Skill",
    badge: "已验证",
    blurb: "把主题收敛成可推进的研究问题，先写清变量再做实验。",
    image: "assets/skill-icon-research.png?v=ls2",
    avatar: "assets/hero-chrome-girl-portrait.png",
    author: "顾言 · 北大 2024",
    role: "认证专家 · 研究设计",
    users: "2,208",
    rate: "79%",
    forks: "73",
    keywords: ["实验", "设计", "研究", "问题", "变量", "自变量", "对照", "样本", "缺口"],
  },
  {
    id: "resume-polish",
    cmd: "/resume-polish",
    title: "简历项目化表达",
    type: "单 Skill",
    badge: "已验证",
    blurb: "把社团、实习和课程经历写成可投递的项目条目。",
    image: "assets/skill-icon-resume-cv.png?v=ls2",
    avatar: "assets/hero-chrome-girl-portrait.png",
    author: "林然 · 清华 2023",
    role: "前字节产品运营实习生",
    users: "3,102",
    rate: "78%",
    forks: "96",
    keywords: ["简历", "实习", "经历", "投递", "项目化", "改简历"],
  },
  {
    id: "star-bullets",
    cmd: "/star-bullets",
    title: "STAR 经历改写 Skill",
    type: "单 Skill",
    badge: "可运行",
    blurb: "用情境-任务-行动-结果改写经历，补上可验证的数字。",
    image: "assets/skill-icon-star.png?v=ls2",
    avatar: "assets/hero-chrome-girl-portrait.png",
    author: "林然 · 清华 2023",
    role: "简历表达教练",
    users: "2,486",
    rate: "80%",
    forks: "71",
    keywords: ["STAR", "简历", "经历", "社团", "量化", "项目"],
  },
  {
    id: "interview-drill",
    cmd: "/interview-drill",
    title: "面试模拟 Skill",
    type: "专家路径",
    badge: "已验证",
    blurb: "按岗位追问，整理可复盘的答法和证据链。",
    image: "assets/skill-icon-interview.png?v=ls2",
    avatar: "assets/hero-assistant-portrait.png",
    author: "宁夏 · 复旦 2022",
    role: "认证专家 · 面试辅导",
    users: "2,774",
    rate: "80%",
    forks: "88",
    keywords: ["面试", "自我介绍", "模拟", "口播", "答法"],
  },
  {
    id: "cold-email",
    cmd: "/cold-email",
    title: "冷邮件沟通 Skill",
    type: "单 Skill",
    badge: "可运行",
    blurb: "起草第一封外联邮件，把请求写短、把对方收益写清。",
    image: "assets/skill-icon-email.png?v=ls2",
    avatar: "assets/avatar-student.png",
    author: "乔予 · 中大 2025",
    role: "科研外联与申请沟通",
    users: "1,640",
    rate: "74%",
    forks: "52",
    keywords: ["冷邮件", "邮件", "外联", "导师", "草稿"],
  },
  {
    id: "followup-email",
    cmd: "/followup-email",
    title: "跟进邮件 Skill",
    type: "单 Skill",
    badge: "可运行",
    blurb: "在不打扰的前提下写第二封跟进，附上可点击的下一步。",
    image: "assets/skill-icon-followup.png?v=ls2",
    avatar: "assets/avatar-student.png",
    author: "乔予 · 中大 2025",
    role: "外联跟进助手",
    users: "1,208",
    rate: "76%",
    forks: "39",
    keywords: ["跟进", "邮件", "冷邮件", "第二封", "回复"],
  },
  {
    id: "data-clean",
    cmd: "/data-clean",
    title: "问卷数据清洗 Skill",
    type: "单 Skill",
    badge: "可运行",
    blurb: "整理字段、缺失和异常值，把表格变成能写进报告的结果。",
    image: "assets/skill-icon-data.png?v=ls2",
    avatar: "assets/avatar-student.png",
    author: "陈可 · 浙大 2024",
    role: "问卷与数据分析",
    users: "1,986",
    rate: "77%",
    forks: "61",
    keywords: ["问卷", "数据", "清洗", "字段", "异常值", "表格"],
  },
  {
    id: "stats-report",
    cmd: "/stats-report",
    title: "描述统计报告 Skill",
    type: "单 Skill",
    badge: "可运行",
    blurb: "输出可解释的描述统计与图表解读，直接贴进报告。",
    image: "assets/skill-icon-stats.png?v=ls2",
    avatar: "assets/avatar-student.png",
    author: "陈可 · 浙大 2024",
    role: "数据分析助手",
    users: "1,512",
    rate: "78%",
    forks: "44",
    keywords: ["统计", "描述统计", "问卷", "数据", "报告", "图表"],
  },
  {
    id: "ppt-outline",
    cmd: "/ppt-outline",
    title: "组会 PPT 大纲 Skill",
    type: "单 Skill",
    badge: "可运行",
    blurb: "把进展拆成一页一结论的幻灯片结构，适合组会汇报。",
    image: "assets/skill-icon-ppt.png?v=ls2",
    avatar: "assets/companion-dog-transparent.png",
    author: "小狗计划官",
    role: "汇报结构助手",
    users: "2,960",
    rate: "81%",
    forks: "92",
    keywords: ["PPT", "组会", "幻灯片", "汇报", "提纲", "制作"],
  },
  {
    id: "speaker-notes",
    cmd: "/speaker-notes",
    title: "发言提纲 Skill",
    type: "单 Skill",
    badge: "可运行",
    blurb: "把 PPT 收成 3 分钟口播稿，标出该强调的证据。",
    image: "assets/skill-icon-speaker.png?v=ls2",
    avatar: "assets/companion-dog-transparent.png",
    author: "小狗计划官",
    role: "组会发言教练",
    users: "1,874",
    rate: "79%",
    forks: "57",
    keywords: ["发言", "组会", "纪要", "口播", "提纲", "汇报"],
  },
  {
    id: "study-outline",
    cmd: "/study-outline",
    title: "学习复盘拆解 Skill",
    type: "组合路径",
    badge: "可运行",
    blurb: "把模糊目标拆成可执行学习块，适合复盘和下一步安排。",
    image: "assets/skill-icon-study.png?v=ls2",
    avatar: "assets/companion-dog-transparent.png",
    author: "小狗计划官",
    role: "学习拆解助手",
    users: "5,430",
    rate: "83%",
    forks: "141",
    keywords: ["复盘", "大纲", "复习", "学习块", "计划", "整理"],
  },
];

const SELF_COMPLETE_HINTS = [
  "图书馆还书", "还书", "占座", "跑步", "健身", "运动", "见面",
  "上课", "通勤", "吃饭", "睡觉", "洗衣", "打扫", "取快递",
  "打印店", "交材料", "盖章", "线下交", "散步", "口语打卡", "英语打卡",
];

/** 任务场景 → 固定 2–3 个强相关 Skill，避免塞入无关推荐 */
const TASK_SKILL_BUNDLES = [
  {
    test: /(文献|综述|精读|论文|引用|原句|缺口对照|升学焦虑)/,
    skills: ["literature-review", "paper-notes", "research"],
  },
  {
    test: /(实验|自变量|对照|样本|研究问题|变量清单|变量)/,
    skills: ["research", "data-clean", "stats-report"],
  },
  {
    test: /(简历|STAR|实习经历|社团经历|量化结果|改简历)/,
    skills: ["resume-polish", "star-bullets", "interview-drill"],
  },
  {
    test: /(冷邮件|外联|导师.*邮件|邮件草稿|跟进.*邮件|第二封)/,
    skills: ["cold-email", "followup-email", "resume-polish"],
  },
  {
    test: /(面试|自我介绍|口播|答法)/,
    skills: ["interview-drill", "star-bullets", "resume-polish"],
  },
  {
    test: /(问卷|数据清洗|异常值|字段|描述统计|统计)/,
    skills: ["data-clean", "stats-report", "research"],
  },
  {
    test: /(PPT|组会|发言|纪要|汇报|幻灯片)/,
    skills: ["ppt-outline", "speaker-notes", "study-outline"],
  },
  {
    test: /(复盘|学习块|复习大纲|今日.*复盘)/,
    skills: ["study-outline", "speaker-notes", "paper-notes"],
  },
];

function skillById(id) {
  return SKILL_CATALOG.find((skill) => skill.id === id);
}

function recommendSkills(text) {
  if (!text) return [];
  if (SELF_COMPLETE_HINTS.some((hint) => text.includes(hint))) return [];

  const bundle = TASK_SKILL_BUNDLES.find((row) => row.test.test(text));
  if (bundle) {
    return bundle.skills.map(skillById).filter(Boolean).slice(0, 3);
  }

  const ranked = SKILL_CATALOG
    .map((skill) => ({
      skill,
      score: skill.keywords.reduce((sum, kw) => sum + (text.includes(kw) ? 1 : 0), 0),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((row) => row.skill);

  return ranked.slice(0, 3);
}

function skillHref(skill, taskText) {
  const query = new URLSearchParams({
    skill: skill.id,
    title: skill.title,
    cmd: skill.cmd,
    task: taskText,
    from: "plan",
  });
  return `my-tasks.html?${query.toString()}`;
}

function skillRecsHtml(text) {
  const skills = recommendSkills(text);
  if (!skills.length) return "";
  return `
    <div class="skill-recs">
      <p>识别到可用 Skill，点选即可在学习页开始</p>
      <div class="skill-rec-track">
        ${skills
          .map(
            (skill) => `
          <a class="skill-rec-card" href="${escapeHtml(skillHref(skill, text))}">
            <span class="skill-rec-icon-wrap">
              <img class="skill-rec-icon" src="${escapeHtml(skill.image)}" alt="" width="56" height="56">
            </span>
            <div class="skill-rec-body">
              <div class="skill-rec-meta">
                <span class="skill-rec-type">${escapeHtml(skill.type)}</span>
                <span class="skill-rec-badge">${escapeHtml(skill.badge)}</span>
              </div>
              <h3>${escapeHtml(skill.title.replace(/ Skill$/, ""))}</h3>
              <p>${escapeHtml(skill.blurb)}</p>
              <div class="skill-rec-stats">
                <span><b>${escapeHtml(skill.users)}</b> 人使用</span>
                <span><b>${escapeHtml(skill.rate)}</b> 完成率</span>
              </div>
            </div>
          </a>`,
          )
          .join("")}
      </div>
    </div>`;
}

function todoItemHtml(item) {
  const focusCtl = item.done
    ? (item.focusMinutes
      ? `<span class="todo-mins">专注 ${item.focusMinutes} 分</span>`
      : "")
    : `<button type="button" class="todo-focus" data-focus="${escapeHtml(item.id)}">开始专注</button>`;
  return `
    <li class="todo-item${item.done ? " done" : ""}">
      <div class="todo-main">
        <label>
          <input type="checkbox" data-toggle="${escapeHtml(item.id)}" ${item.done ? "checked" : ""}>
          <span>${escapeHtml(item.text)}</span>
        </label>
        ${focusCtl}
        <button type="button" class="todo-del" data-del="${escapeHtml(item.id)}" aria-label="删除 ${escapeHtml(item.text)}">删除</button>
      </div>
      ${item.done ? "" : skillRecsHtml(item.text)}
    </li>`;
}

const planRoot = document.getElementById("todo-form");
const gridRoot = document.getElementById("cal-grid");
const isDayPage = Boolean(document.getElementById("day-view"));
if (planRoot || gridRoot) {
  const now = DEMO_TODAY;
  const todayKey = toDayKey(now);
  const hash = location.hash.replace("#", "");
  let year = now.getFullYear();
  let monthIndex = now.getMonth();
  let selected = /^\d{4}-\d{2}-\d{2}$/.test(hash) ? hash : todayKey;
  if (selected !== todayKey) {
    const date = parseDayKey(selected);
    year = date.getFullYear();
    monthIndex = date.getMonth();
  }
  const store = loadStore();
  let sheetOpen = !isDayPage && /^\d{4}-\d{2}-\d{2}$/.test(hash);

  function persistDay(key, record) {
    store[key] = record;
    saveStore(store);
  }

  const FOCUS_DURATIONS = [15, 25, 45, 50];
  const FOCUS_PETS = {
    cat: { name: "小猫", src: "assets/focus-study-cat.png", doorSrc: "assets/focus-study-cat.png" },
    dog: { name: "小狗", src: "assets/focus-study-dog.png", doorSrc: "assets/focus-door-dog.png" },
    capybara: { name: "水豚", src: "assets/focus-study-capybara.png", doorSrc: "assets/focus-study-capybara.png" },
  };

  function currentFocusPet() {
    try {
      const raw = localStorage.getItem("gf-pet-demo-v3") || localStorage.getItem("gf-pet-demo-v1");
      const petId = raw ? JSON.parse(raw)?.profile?.petId : "";
      if (petId && FOCUS_PETS[petId]) return FOCUS_PETS[petId];
    } catch {
      /* pet demo store is optional */
    }
    return FOCUS_PETS.dog;
  }

  function formatRemain(sec) {
    const m = Math.floor(Math.max(0, sec) / 60);
    const s = Math.max(0, sec) % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function addBondMinutes(minutes) {
    try {
      const raw = localStorage.getItem("gf-pet-demo-v3");
      if (!raw) return;
      const state = JSON.parse(raw);
      if (!state.bond) return;
      state.bond.focusMinutesTotal = (state.bond.focusMinutesTotal || 0) + minutes;
      localStorage.setItem("gf-pet-demo-v3", JSON.stringify(state));
    } catch {
      /* pet demo store is optional */
    }
  }

  const focus = {
    root: null,
    itemId: "",
    minutes: 25,
    remain: 0,
    total: 0,
    timer: null,
    wake: null,
    stage: "idle",
  };

  function mountFocusRoom() {
    if (focus.root) return focus.root;
    const pet = currentFocusPet();
    const chips = FOCUS_DURATIONS.map((n) => (
      `<button type="button" class="focus-chip" data-mins="${n}" aria-pressed="${n === 25 ? "true" : "false"}">${n}分</button>`
    )).join("");
    const node = document.createElement("div");
    node.id = "focus-room";
    node.className = "focus-room";
    node.setAttribute("role", "dialog");
    node.setAttribute("aria-modal", "true");
    node.setAttribute("aria-labelledby", "focus-card-title");
    node.innerHTML = `
      <!--
        THESIS: Focus is sitting at the chrome desk while the oval campus window is the clock. Refuses a floating pomodoro ring on a blank canvas.
        OWN-WORLD: Silver-white lounge, chrome-rim glass card, Outfit numerals in the right-hand window, one pink arc with a knob, puppy writing at the desk.
        STORY: Pick a duration at the door, sit with the pet, stay until the window runs out or the round breaks.
        FIRST VIEWPORT: Doorway into the room; glass card 进屋专注; 15/25/45/50; pink 开始倒计时.
        FORM: Window-clock theater + threshold entry. User comps focus-room-session-desk / focus-room-threshold-door, pet is the puppy.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
      -->
      <div class="focus-scene">
        <img class="focus-bg focus-bg-door" src="assets/focus-threshold-bg.png" alt="">
        <img class="focus-bg focus-bg-run" src="assets/focus-session-bg.png" alt="">
        <div class="focus-window">
          <svg class="focus-arc" viewBox="0 0 200 200" aria-hidden="true">
            <circle class="focus-arc-stroke" id="focus-arc" cx="100" cy="100" r="92" pathLength="100"/>
            <circle class="focus-arc-knob" id="focus-arc-knob" cx="100" cy="8" r="4.2"/>
          </svg>
          <div class="focus-clock-stack">
            <p class="focus-task-label" id="focus-task-label"></p>
            <p class="focus-clock" id="focus-clock">25:00</p>
          </div>
        </div>
      </div>
      <div class="focus-hud">
        <button type="button" class="focus-pill" id="focus-leave">离开</button>
        <p class="focus-hud-status" id="focus-hud-status">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M11 5L6 9H3v6h3l5 4V5z"/>
            <path d="M22 9l-6 6M16 9l6 6"/>
          </svg>
          <span id="focus-hud-copy">专注中 · 25 分钟</span>
        </p>
        <button type="button" class="focus-pill" id="focus-fs"><span>全屏</span></button>
      </div>
      <div class="focus-door" id="focus-door">
        <button type="button" class="focus-back" id="focus-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg>
          返回日计划
        </button>
        <div class="focus-card">
          <h2 id="focus-card-title">进屋专注</h2>
          <p class="focus-card-task" id="focus-card-task"></p>
          <div class="focus-chips" role="group" aria-label="专注时长">${chips}</div>
          <button type="button" class="focus-go" id="focus-start">开始倒计时</button>
          <p class="focus-warn">中途离开会打断这一轮</p>
        </div>
      </div>
      <img class="focus-pet" id="focus-pet" src="${pet.src}" alt="${pet.name}在书桌前学习">
      <div class="focus-result" id="focus-result" hidden>
        <div class="focus-card">
          <h2 id="focus-result-title"></h2>
          <p class="focus-card-task" id="focus-result-copy"></p>
          <button type="button" class="focus-go" id="focus-result-go">返回日计划</button>
        </div>
      </div>
    `;
    document.body.append(node);
    focus.root = node;
    node.querySelectorAll("[data-mins]").forEach((chip) => {
      chip.addEventListener("click", () => selectFocusMins(Number(chip.dataset.mins)));
    });
    document.getElementById("focus-start").addEventListener("click", startFocusRound);
    document.getElementById("focus-back").addEventListener("click", () => closeFocusRoom(false));
    document.getElementById("focus-leave").addEventListener("click", () => breakFocusRound("leave"));
    document.getElementById("focus-fs").addEventListener("click", toggleFocusFullscreen);
    document.getElementById("focus-result-go").addEventListener("click", () => closeFocusRoom(false));
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && focus.stage === "run") breakFocusRound("hide");
    });
    document.addEventListener("fullscreenchange", () => {
      focus.root?.classList.toggle("is-fs", Boolean(document.fullscreenElement));
      const label = document.querySelector("#focus-fs span");
      if (label) label.textContent = document.fullscreenElement ? "退出全屏" : "全屏";
    });
    window.addEventListener("keydown", (event) => {
      if (!focus.root?.classList.contains("show")) return;
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (focus.stage === "run") breakFocusRound("leave");
      else closeFocusRoom(false);
    });
    return node;
  }

  function paintFocusPet() {
    const pet = currentFocusPet();
    const img = document.getElementById("focus-pet");
    if (!img) return;
    const door = focus.stage === "door";
    img.src = door ? pet.doorSrc : pet.src;
    img.alt = `${pet.name}在书桌前学习`;
  }

  function setFocusStage(stage) {
    focus.stage = stage;
    const root = focus.root;
    if (!root) return;
    root.classList.toggle("is-door", stage === "door");
    root.classList.toggle("is-run", stage === "run");
    root.classList.toggle("is-done", stage === "done");
    root.classList.toggle("is-broke", stage === "broke");
    document.getElementById("focus-result").hidden = stage !== "done" && stage !== "broke";
    paintFocusPet();
  }

  function selectFocusMins(mins) {
    focus.minutes = mins;
    focus.root?.querySelectorAll("[data-mins]").forEach((chip) => {
      chip.setAttribute("aria-pressed", chip.dataset.mins === String(mins) ? "true" : "false");
    });
    document.getElementById("focus-clock").textContent = formatRemain(mins * 60);
    const hud = document.getElementById("focus-hud-copy");
    if (hud) hud.textContent = `专注中 · ${mins} 分钟`;
  }

  function paintFocusClock() {
    document.getElementById("focus-clock").textContent = formatRemain(focus.remain);
    const arc = document.getElementById("focus-arc");
    const knob = document.getElementById("focus-arc-knob");
    if (arc && focus.total) {
      const p = Math.max(0, Math.min(1, focus.remain / focus.total));
      const frac = 0.28 * p;
      arc.style.strokeDasharray = `${(frac * 100).toFixed(2)} 100`;
      if (knob) {
        const sweep = 360 * frac;
        const rad = ((-90 + sweep) * Math.PI) / 180;
        knob.setAttribute("cx", (100 + 92 * Math.cos(rad)).toFixed(2));
        knob.setAttribute("cy", (100 + 92 * Math.sin(rad)).toFixed(2));
      }
    }
  }

  function openFocusRoom(itemId) {
    const record = dayRecord(store, selected);
    const item = record.todos.find((todo) => todo.id === itemId);
    if (!item || item.done) return;
    const root = mountFocusRoom();
    focus.itemId = item.id;
    selectFocusMins(25);
    paintFocusPet();
    document.getElementById("focus-card-task").textContent = item.text;
    document.getElementById("focus-task-label").textContent = item.text;
    document.getElementById("focus-result").hidden = true;
    root.classList.add("show");
    document.body.style.overflow = "hidden";
    setFocusStage("door");
    document.getElementById("focus-start").focus();
  }

  async function startFocusRound() {
    focus.total = focus.minutes * 60;
    focus.remain = focus.total;
    paintFocusClock();
    setFocusStage("run");
    clearInterval(focus.timer);
    focus.timer = setInterval(() => {
      focus.remain -= 1;
      paintFocusClock();
      if (focus.remain <= 0) completeFocusRound();
    }, 1000);
    try {
      focus.wake = await navigator.wakeLock?.request("screen");
    } catch {
      focus.wake = null;
    }
  }

  function stopFocusTimer() {
    if (focus.timer) clearInterval(focus.timer);
    focus.timer = null;
    focus.wake?.release?.();
    focus.wake = null;
  }

  function completeFocusRound() {
    if (focus.stage !== "run") return;
    stopFocusTimer();
    const minutes = focus.minutes;
    const record = dayRecord(store, selected);
    const item = record.todos.find((todo) => todo.id === focus.itemId);
    if (item) {
      item.done = true;
      item.focusMinutes = minutes;
      persistDay(selected, record);
    }
    addBondMinutes(minutes);
    const pet = currentFocusPet();
    document.getElementById("focus-result-title").textContent = "专注完成";
    document.getElementById("focus-result-copy").textContent = `${pet.name}陪你坐完了 ${minutes} 分钟。这件事已勾进今日计划。`;
    setFocusStage("done");
    render();
  }

  function breakFocusRound(reason) {
    if (focus.stage !== "run") return;
    stopFocusTimer();
    const pet = currentFocusPet();
    const copy = reason === "hide"
      ? `切走页面会打断这一轮。${pet.name}还在书桌前等你回来。`
      : `中途离开会打断这一轮。任务仍留在日计划里。`;
    document.getElementById("focus-result-title").textContent = "这一轮被打断了";
    document.getElementById("focus-result-copy").textContent = copy;
    setFocusStage("broke");
  }

  async function toggleFocusFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
      return;
    }
    await focus.root?.requestFullscreen().catch(() => {});
  }

  async function closeFocusRoom() {
    stopFocusTimer();
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    focus.root?.classList.remove("show", "is-door", "is-run", "is-done", "is-broke", "is-fs");
    document.body.style.overflow = "";
    focus.stage = "idle";
    focus.itemId = "";
  }

  function render() {
    if (isDayPage) {
      const title = document.getElementById("plan-title");
      if (title) title.textContent = formatDayLabel(selected);
      renderTodos();
      return;
    }
    const title = document.getElementById("cal-month-label");
    if (title) title.textContent = monthGrid(year, monthIndex).label;
    renderMonth();
    renderDaySheet();
  }

  function renderTodos() {
    const record = dayRecord(store, selected);
    const list = document.getElementById("todo-list");
    const progress = document.getElementById("todo-progress");
    const doneCount = record.todos.filter((item) => item.done).length;
    const total = record.todos.length;

    if (!total) {
      progress.textContent = "今天还没有待办";
    } else {
      const recCount = record.todos.filter((item) => !item.done && recommendSkills(item.text).length).length;
      progress.textContent = recCount
        ? `今日 ${doneCount}/${total} · ${recCount} 项可用 Skill 完成`
        : `今日 ${doneCount}/${total} · 事项会同步到日历格子`;
    }

    if (!record.todos.length) {
      list.innerHTML = `<li class="todo-empty">把今天要做的事写下来，完成后勾选，日历会一起更新。</li>`;
      return;
    }

    list.innerHTML = record.todos.map((item) => todoItemHtml(item)).join("");

    const noteInput = document.getElementById("todo-note");
    if (noteInput && document.activeElement !== noteInput) {
      noteInput.value = record.note || "";
    }
  }

  function renderMonth() {
    const meta = monthGrid(year, monthIndex);
    const grid = document.getElementById("cal-grid");
    grid.innerHTML = "";
    meta.cells.forEach((cell) => {
      const record = dayRecord(store, cell.key);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "day-cell";
      btn.setAttribute("aria-label", `${cell.date.getMonth() + 1}月${cell.date.getDate()}日`);
      if (cell.outside) btn.classList.add("outside");
      if (cell.key === todayKey) btn.classList.add("today");
      if (cell.key === selected) btn.classList.add("selected");

      const lines = record.todos
        .slice(0, 2)
        .map((item) => `<span class="task-line">${escapeHtml(item.text)}</span>`)
        .join("");
      const insight = record.note
        ? `<span class="insight">${QUOTE_ICON}<span>${escapeHtml(record.note)}</span></span>`
        : "";

      btn.innerHTML = `<span class="num">${cell.date.getDate()}</span>${lines}${insight}`;
      btn.addEventListener("click", () => {
        selected = cell.key;
        year = cell.date.getFullYear();
        monthIndex = cell.date.getMonth();
        sheetOpen = true;
        history.replaceState(null, "", `#${selected}`);
        render();
        document.getElementById("day-sheet")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      grid.append(btn);
    });
  }

  function renderDaySheet() {
    const sheet = document.getElementById("day-sheet");
    if (!sheet) return;
    if (!sheetOpen) {
      sheet.classList.remove("show");
      sheet.innerHTML = "";
      return;
    }
    const record = dayRecord(store, selected);
    const doneCount = record.todos.filter((item) => item.done).length;
    const total = record.todos.length;
    const list = record.todos.length
      ? record.todos.map((item) => todoItemHtml(item)).join("")
      : `<li class="todo-empty">这一天还没有计划。</li>`;

    sheet.classList.add("show");
    sheet.innerHTML = `
      <div class="sheet-head">
        <h2>${formatDayLabel(selected)}</h2>
        <p class="sub">${total ? `当天计划 ${doneCount}/${total}` : "点击下方可以补上这一天的待办"}</p>
      </div>
      <form class="todo-composer" id="sheet-form">
        <input id="sheet-input" type="text" maxlength="80" placeholder="写下这一天要完成的一件事" autocomplete="off" aria-label="新增待办">
        <button type="submit">添加</button>
      </form>
      <ul class="todo-list sheet-list">${list}</ul>
      <label class="todo-note">
        <span>今日感悟</span>
        <textarea id="sheet-note" rows="2" maxlength="40" placeholder="写一句这一天的感受，会出现在日历格子里">${escapeHtml(record.note || "")}</textarea>
      </label>
    `;
  }

  planRoot?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("todo-input");
    const text = input.value.trim();
    if (!text) return;
    const record = dayRecord(store, selected);
    record.todos.push({ id: uid(), text, done: false });
    persistDay(selected, record);
    input.value = "";
    toast("已加入今日计划");
    render();
  });

  document.getElementById("todo-list")?.addEventListener("change", (event) => {
    const toggle = event.target.closest("[data-toggle]");
    if (!toggle) return;
    const record = dayRecord(store, selected);
    const item = record.todos.find((todo) => todo.id === toggle.dataset.toggle);
    if (!item) return;
    item.done = toggle.checked;
    persistDay(selected, record);
    toast(item.done ? "已同步到日历" : "已改回未完成");
    render();
  });

  document.getElementById("todo-note")?.addEventListener("change", (event) => {
    const record = dayRecord(store, selected);
    record.note = event.target.value.trim();
    persistDay(selected, record);
    toast("感悟已同步到日历");
  });

  document.getElementById("todo-list")?.addEventListener("click", (event) => {
    const focusBtn = event.target.closest("[data-focus]");
    if (focusBtn) {
      openFocusRoom(focusBtn.dataset.focus);
      return;
    }
    const del = event.target.closest("[data-del]");
    if (!del) return;
    const record = dayRecord(store, selected);
    record.todos = record.todos.filter((todo) => todo.id !== del.dataset.del);
    persistDay(selected, record);
    toast("已从计划中移除");
    render();
  });

  const sheet = document.getElementById("day-sheet");
  sheet?.addEventListener("submit", (event) => {
    if (!event.target.closest("#sheet-form")) return;
    event.preventDefault();
    const input = document.getElementById("sheet-input");
    const text = input?.value.trim();
    if (!text) return;
    const record = dayRecord(store, selected);
    record.todos.push({ id: uid(), text, done: false });
    persistDay(selected, record);
    toast("已加入这一天的计划");
    render();
  });
  sheet?.addEventListener("change", (event) => {
    const toggle = event.target.closest("[data-toggle]");
    const note = event.target.closest("#sheet-note");
    const record = dayRecord(store, selected);
    if (toggle) {
      const item = record.todos.find((todo) => todo.id === toggle.dataset.toggle);
      if (!item) return;
      item.done = toggle.checked;
      persistDay(selected, record);
      toast(item.done ? "已记下完成" : "已改回未完成");
      render();
      return;
    }
    if (note) {
      record.note = note.value.trim();
      persistDay(selected, record);
      toast("感悟已写进日历");
      render();
    }
  });
  sheet?.addEventListener("click", (event) => {
    const del = event.target.closest("[data-del]");
    if (!del) return;
    const record = dayRecord(store, selected);
    record.todos = record.todos.filter((todo) => todo.id !== del.dataset.del);
    persistDay(selected, record);
    toast("已从计划中移除");
    render();
  });

  document.getElementById("cal-prev").onclick = () => {
    if (isDayPage) {
      selected = shiftDay(selected, -1);
      const date = parseDayKey(selected);
      year = date.getFullYear();
      monthIndex = date.getMonth();
      history.replaceState(null, "", `#${selected}`);
    } else {
      monthIndex -= 1;
      if (monthIndex < 0) {
        monthIndex = 11;
        year -= 1;
      }
    }
    render();
  };

  document.getElementById("cal-next").onclick = () => {
    if (isDayPage) {
      selected = shiftDay(selected, 1);
      const date = parseDayKey(selected);
      year = date.getFullYear();
      monthIndex = date.getMonth();
      history.replaceState(null, "", `#${selected}`);
    } else {
      monthIndex += 1;
      if (monthIndex > 11) {
        monthIndex = 0;
        year += 1;
      }
    }
    render();
  };

  document.getElementById("cal-today").onclick = () => {
    year = now.getFullYear();
    monthIndex = now.getMonth();
    selected = todayKey;
    if (isDayPage) history.replaceState(null, "", `#${selected}`);
    render();
  };

  document.getElementById("plan-view")?.addEventListener("change", (event) => {
    location.href = event.target.value;
  });

  render();
}
