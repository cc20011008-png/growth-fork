import { $ } from "../lib/dom.js";

const PAW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-2.2 2.4-3.5 4.2-3.5 6.2A3.5 3.5 0 0 0 12 12.7a3.5 3.5 0 0 0 3.5-3.5C15.5 7.2 14.2 5.4 12 3zm-4.8 9.8c-1.7 1.1-2.7 2.5-2.7 4.1 0 1.8 2.4 3.1 5.5 3.1h2c3.1 0 5.5-1.3 5.5-3.1 0-1.6-1-3-2.7-4.1-.7.7-1.7 1.2-2.8 1.2h-2c-1.1 0-2.1-.5-2.8-1.2z"/></svg>`;
const SPARK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.2 6.2L19 8l-4.3 3.2L16 18l-4-3.2L8 18l1.3-6.8L5 8l5.8-.8L12 2z"/></svg>`;
const BELL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6.5 16.5h11l-1.2-1.2V11a4.3 4.3 0 1 0-8.6 0v4.3L6.5 16.5z"/><path d="M10 16.5a2 2 0 0 0 4 0"/><path d="M12 4v1.2"/></svg>`;
const CHEV = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 10l5 5 5-5"/></svg>`;

/**
 * @param {{ active?: string, pet?: object|null, userName?: string, mode?: 'home'|'simple' }} opts
 */
export function renderNav({ active = "home", pet = null, userName = "同学", mode = "simple" } = {}) {
  const host = $("#app-nav");
  if (!host) return;

  const plannerName = pet ? `${pet.name}计划官` : "小狗计划官";

  if (mode === "home") {
    host.className = "topbar";
    host.innerHTML = `
      <a class="topbrand" href="./index.html">
        <span class="paw">${PAW}</span>
        <strong>${plannerName}</strong>
        <span class="buddy">${SPARK}<span>你的学习搭子</span></span>
      </a>
      <div class="top-right">
        <a class="ghost-link" href="./calendar.html">日历</a>
        <a class="ghost-link" href="./report.html">月报</a>
        <button class="icon-btn" type="button" id="open-bond" aria-label="通知与养成">${BELL}</button>
        <button class="profile-btn" type="button" id="open-bond-profile">
          <img class="profile-avatar" src="../assets/avatar-student.png" alt="">
          <span>${userName || "同学"}</span>
          ${CHEV}
        </button>
      </div>
    `;
    return;
  }

  host.className = "nav demo-nav";
  host.innerHTML = `
    <a class="brand brand-pet" href="./index.html">
      <span class="paw">${PAW}</span>
      <span class="titles">
        <strong>${plannerName}</strong>
        <span class="buddy-pill">${SPARK} 你的学习搭子</span>
      </span>
    </a>
    <div class="nav-links">
      <a href="./index.html" class="${active === "home" ? "active" : ""}">今日对话</a>
      <a href="./calendar.html" class="${active === "calendar" ? "active" : ""}">学习日历</a>
      <a href="./report.html" class="${active === "report" ? "active" : ""}">月度小结</a>
      <a href="./index.html">返回学习</a>
    </div>
    <div class="nav-actions">
      <button class="btn btn-ghost" type="button" id="open-bond" ${pet ? "" : "hidden"}>
        ${pet ? `${pet.name} · 养成` : "养成"}
      </button>
      <span class="pill" style="gap:8px">
        <img src="../assets/avatar-student.png" alt="" width="28" height="28" style="border-radius:50%;object-fit:cover">
        ${userName || "同学"}
      </span>
    </div>
  `;
}