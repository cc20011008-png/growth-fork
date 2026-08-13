import { PET_LIST } from "../config/pets.js";
import { $, el, toast } from "../lib/dom.js";
import { saveState } from "../lib/store.js";

export function mountOnboarding(state, { onDone }) {
  const root = $("#onboarding");
  if (!root) return;
  if (state.onboarded) {
    root.hidden = true;
    return;
  }

  root.hidden = false;
  let petId = "dog";

  root.innerHTML = "";
  const card = el("div", { className: "onboard-card glass-pane" });
  card.append(
    el("p", { className: "pill pill-pink", text: "Pet Agent Demo" }),
    el("h1", { className: "display", text: "小狗会陪你打成长仗" }),
    el("p", { className: "lead", text: "你越学习，它越懂你。今日目标、计划、Skill 与日历，都由它陪你完成。" }),
  );

  const profile = el("div", { className: "profile-row" });
  profile.innerHTML = `
    <div class="field">
      <label for="user-name">怎么称呼你</label>
      <input id="user-name" maxlength="12" placeholder="例如：小林" value="${state.profile.name || ""}">
    </div>
    <div class="field">
      <label>成长搭子</label>
      <input value="小狗 · 热情行动派" disabled>
    </div>
  `;
  card.append(profile);

  const grid = el("div", { className: "pet-pick" });
  PET_LIST.filter((pet) => pet.id === "dog").forEach((pet) => {
    const btn = el("button", {
      className: `pet-option${pet.id === petId ? " selected" : ""}`,
      type: "button",
      dataset: { pet: pet.id },
      on: {
        click: () => {
          petId = pet.id;
          grid.querySelectorAll(".pet-option").forEach((n) => n.classList.toggle("selected", n.dataset.pet === petId));
        },
      },
    });
    btn.innerHTML = `
      <img src="${pet.imageSolid}" alt="${pet.name}">
      <div class="copy">
        <h3>${pet.name}</h3>
        <p>${pet.personality}</p>
        <p>「${pet.greeting}」</p>
      </div>
    `;
    grid.append(btn);
  });
  card.append(grid);

  const actions = el("div", { className: "onboard-actions" });
  const start = el("button", {
    className: "btn btn-pink",
    type: "button",
    text: "和小狗一起出发",
    on: {
      click: () => {
        const name = ($("#user-name")?.value || "").trim() || "同学";
        state.profile.name = name;
        state.profile.petId = "dog";
        state.onboarded = true;
        saveState(state);
        root.hidden = true;
        toast(`${PET_LIST.find((p) => p.id === petId).name}已就位`);
        onDone?.();
      },
    },
  });
  actions.append(start);
  card.append(actions);
  root.append(card);
}