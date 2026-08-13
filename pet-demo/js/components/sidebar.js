import { $ } from "../lib/dom.js";
import { getPet } from "../lib/store.js";

const ICONS = {
  today: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"/></svg>`,
  learn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6.5c3.2-1.6 6.4-1.6 8 0 1.6-1.6 4.8-1.6 8 0V18c-3.2-1.4-6.4-1.4-8 0-1.6-1.4-4.8-1.4-8 0V6.5z"/><path d="M12 6.5V18"/></svg>`,
  project: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8z"/><path d="M8 8V6.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5V8"/></svg>`,
  review: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-7"/><path d="M4 19h16"/></svg>`,
  inbox: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 13l2.2-7h11.6L20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6z"/><path d="M4 13h4.2l1.3 2h5l1.3-2H20"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3.5l2.4 5.4 5.9.6-4.4 3.8 1.3 5.7L12 16.6 6.8 19l1.3-5.7L3.7 9.5l5.9-.6L12 3.5z"/></svg>`,
  sprout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21V11"/><path d="M12 14c-4-1-6-4-6-8 4 0 6 2 6 6z"/><path d="M12 12c3-.5 6-3 7-7-4 .2-6 2.5-7 7z"/></svg>`,
  plan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,
  goal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>`,
  habit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z"/></svg>`,
  stats: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20h16"/><path d="M7 16V9"/><path d="M12 16V5"/><path d="M17 16v-6"/></svg>`,
  paw: `<svg viewBox="0 0 24 24"><path d="M12 3c-2.2 2.4-3.5 4.2-3.5 6.2A3.5 3.5 0 0 0 12 12.7a3.5 3.5 0 0 0 3.5-3.5C15.5 7.2 14.2 5.4 12 3zm-4.8 9.8c-1.7 1.1-2.7 2.5-2.7 4.1 0 1.8 2.4 3.1 5.5 3.1h2c3.1 0 5.5-1.3 5.5-3.1 0-1.6-1-3-2.7-4.1-.7.7-1.7 1.2-2.8 1.2h-2c-1.1 0-2.1-.5-2.8-1.2z"/></svg>`,
  chev: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>`,
};

export function renderSidebar(state, { active = "plan" } = {}) {
  const host = $("#app-sidebar");
  if (!host) return;
  const pet = getPet(state);

  host.innerHTML = `
    <a class="side-brand fork-brand" href="./index.html">
      <span class="side-sprout">${ICONS.sprout}</span>
      <strong>成长 Fork</strong>
    </a>
    <nav class="side-nav">
      <a class="on" href="./index.html"><span>首页</span></a>
      <a href="../index.html"><span>市集</span></a>
      <a href="../my-tasks.html"><span>学习</span></a>
      <a href="../calendar.html"><span>每日计划</span></a>
      <a href="../school-zone.html"><span>学校专区</span></a>
      <a href="../campus-map.html"><span>附近 Skill 创作者</span></a>
    </nav>
    <a class="user-entry" href="../my-growth.html" aria-label="林的主页" title="林 · 已登录">
      <img src="../assets/avatar-student.png" alt="林" width="40" height="40">
    </a>
    <div class="side-pet">
      <img src="${pet.faceImage || pet.image}" alt="">
      <span>${pet.name}陪伴中</span>
    </div>
  `;
}