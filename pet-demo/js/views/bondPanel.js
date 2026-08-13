import { el } from "../lib/dom.js";
import { ACHIEVEMENT_META } from "../services/calendarAgent.js";
import { getPet } from "../lib/store.js";

export function mountBondPanel(state) {
  let backdrop = document.querySelector(".bond-backdrop");
  let drawer = document.querySelector(".bond-drawer");
  if (!backdrop) {
    backdrop = el("div", { className: "bond-backdrop", on: { click: close } });
    document.body.append(backdrop);
  }
  if (!drawer) {
    drawer = el("aside", { className: "bond-drawer", "aria-label": "养成面板" });
    document.body.append(drawer);
  }

  function close() {
    backdrop.classList.remove("open");
    drawer.classList.remove("open");
  }

  function open() {
    render();
    backdrop.classList.add("open");
    drawer.classList.add("open");
  }

  function render() {
    const pet = getPet(state);
    const xpInLevel = state.bond.xp % 50;
    const pct = Math.min(100, (xpInLevel / 50) * 100);
    const achievements = state.bond.achievements
      .map((id) => ACHIEVEMENT_META[id])
      .filter(Boolean);

    drawer.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div>
          <h2 style="margin:0;font-size:20px">${pet.name} · 懂你 Lv.${state.bond.level}</h2>
          <p class="muted" style="margin:4px 0 0;font-size:12px">${pet.personality}</p>
        </div>
        <button class="btn btn-ghost" type="button" id="bond-close">关闭</button>
      </div>
      <img class="pet" src="${pet.image}" alt="">
      <div class="xp-track"><span style="width:${pct}%"></span></div>
      <p class="muted" style="margin:0;font-size:12px">经验 ${xpInLevel}/50 · 连续开战 ${state.bond.streak} 天</p>
      <div class="bond-stats">
        <div><b>${state.bond.focusMinutesTotal}</b><span>专注分钟</span></div>
        <div><b>${state.bond.practiceCount}</b><span>有效实践</span></div>
      </div>
      <h3 style="margin:8px 0 0;font-size:14px">成就</h3>
      <div class="achieve-list">
        ${
          achievements.length
            ? achievements.map((a) => `<article><b>${a.title}</b><span>${a.blurb}</span></article>`).join("")
            : `<article><b>还在路上</b><span>完成第一场战役后会出现</span></article>`
        }
      </div>
    `;
    drawer.querySelector("#bond-close")?.addEventListener("click", close);
  }

  document.getElementById("open-bond")?.addEventListener("click", open);

  return { open, close, render };
}