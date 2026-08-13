import { $, el, toast } from "../lib/dom.js";
import { getPet, saveState } from "../lib/store.js";
import { acceptLetter, stashLetterInDrawer, reopenDrawerLetter } from "../services/petAgent.js";

function esc(text) {
  const node = document.createElement("div");
  node.textContent = text;
  return node.innerHTML;
}

function formatBody(text) {
  return esc(text)
    .split(/\n+/)
    .filter(Boolean)
    .map((line) => `<p>${line}</p>`)
    .join("");
}

/**
 * Mount Travel-Frog style letter souvenir on the pet room homepage.
 * Demo C: letter already minted on load — show prop + toast, open overlay on click.
 */
export function mountLetterSouvenir(state, { onAccept } = {}) {
  const pet = getPet(state);
  let host = $("#pet-letter-layer");
  if (!host) {
    // Append to body so position:fixed is not trapped by 3D/room transforms.
    host = el("div", { id: "pet-letter-layer", className: "pet-letter-layer" });
    document.body.append(host);
  }

  function persist() {
    saveState(state);
  }

  function letter() {
    return state.petAgent?.letter || null;
  }

  function closeOverlay() {
    host.querySelector(".pet-letter-backdrop")?.classList.remove("open");
    host.querySelector(".pet-letter-sheet")?.classList.remove("open");
    document.body.classList.remove("letter-open");
  }

  function openOverlay() {
    const current = letter();
    if (!current) return;
    current.status = current.status === "unread" ? "opened" : current.status;
    persist();
    renderOverlay();
    host.querySelector(".pet-letter-backdrop")?.classList.add("open");
    host.querySelector(".pet-letter-sheet")?.classList.add("open");
    document.body.classList.add("letter-open");
    hideToast();
  }

  function hideToast() {
    host.querySelector(".pet-letter-toast")?.classList.remove("show");
  }

  function showToast() {
    const toastEl = host.querySelector(".pet-letter-toast");
    if (!toastEl) return;
    toastEl.classList.add("show");
  }

  function renderProp() {
    const current = letter();
    let prop = host.querySelector(".pet-letter-prop");
    if (!current || current.status === "accepted") {
      prop?.remove();
      return;
    }
    if (!prop) {
      prop = el("button", {
        className: "pet-letter-prop",
        type: "button",
        "aria-label": "打开小狗寄回的信",
      });
      host.append(prop);
      prop.addEventListener("click", openOverlay);
    }
    prop.innerHTML = `
      <span class="pet-letter-prop-seal" aria-hidden="true"></span>
      <span class="pet-letter-prop-copy">
        <b>${esc(pet.name)}寄回的信</b>
        <em>点开看看</em>
      </span>
    `;
    prop.hidden = false;
  }

  function renderToast() {
    let toastEl = host.querySelector(".pet-letter-toast");
    if (!toastEl) {
      toastEl = el("button", {
        className: "pet-letter-toast",
        type: "button",
        "aria-label": "查看寄回的信",
      });
      host.append(toastEl);
      toastEl.addEventListener("click", openOverlay);
    }
    toastEl.innerHTML = `
      <img src="${pet.faceImage || pet.image}" alt="">
      <span>
        <b>${esc(pet.name)}回来了</b>
        <em>带了封信 · 点开看看</em>
      </span>
    `;
  }

  function renderOverlay() {
    const current = letter();
    if (!current) return;

    let backdrop = host.querySelector(".pet-letter-backdrop");
    let sheet = host.querySelector(".pet-letter-sheet");
    if (!backdrop) {
      backdrop = el("div", {
        className: "pet-letter-backdrop",
        on: { click: closeOverlay },
      });
      host.append(backdrop);
    }
    if (!sheet) {
      sheet = el("aside", {
        className: "pet-letter-sheet",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "从市集寄回的信",
      });
      host.append(sheet);
    }

    const skillTitle = (current.skill.title || "").replace(/ Skill$/, "");

    sheet.innerHTML = `
      <div class="pet-letter-rim" aria-hidden="true"></div>
      <div class="pet-letter-panel">
        <button class="pet-letter-close" type="button" aria-label="关闭">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
        <header class="pet-letter-mailhead" aria-hidden="true">
          <img class="pet-letter-wax" src="../assets/letter-wax-seal.png?v=2" alt="" width="88" height="88">
          <div class="pet-letter-post">
            <img class="pet-letter-postmark" src="../assets/letter-postmark.png?v=2" alt="" width="96" height="36">
            <img class="pet-letter-stamp" src="../assets/letter-postage-stamp.png?v=2" alt="" width="72" height="72">
          </div>
        </header>
        <h2 class="pet-letter-title">${esc(current.title)}</h2>
        <div class="pet-letter-body">${formatBody(current.body)}</div>
        <article class="pet-letter-skill">
          <img class="pet-letter-skill-icon" src="../assets/letter-skill-clipboard.png?v=2" alt="" width="56" height="56">
          <div class="pet-letter-skill-copy">
            <b>${esc(skillTitle)}</b>
            <span>${esc(current.skill.blurb)}</span>
            <em>
              <img src="../assets/letter-tomato.png?v=2" alt="" width="14" height="14">
              约 ${current.skill.tomatoes} 番茄 · 匹配你卡住的目标
            </em>
          </div>
        </article>
        <div class="pet-letter-actions">
          <button class="pet-letter-accept" type="button" id="pet-letter-accept">收下这份 Skill</button>
          <button class="pet-letter-drawer" type="button" id="pet-letter-drawer">先放进抽屉</button>
        </div>
      </div>
    `;

    sheet.querySelector(".pet-letter-close")?.addEventListener("click", closeOverlay);
    sheet.querySelector("#pet-letter-accept")?.addEventListener("click", () => {
      const accepted = acceptLetter(state);
      persist();
      closeOverlay();
      renderProp();
      hideToast();
      renderDrawerBtn();
      toast(`已收下「${accepted?.skill.title || "Skill"}」`);
      onAccept?.(accepted);
    });
    sheet.querySelector("#pet-letter-drawer")?.addEventListener("click", () => {
      stashLetterInDrawer(state);
      persist();
      closeOverlay();
      renderProp();
      hideToast();
      renderDrawerBtn();
      toast("信已放进房间抽屉，随时可回看");
    });
  }

  function renderDrawerBtn() {
    const drawer = state.petAgent?.drawer || [];
    let btn = host.querySelector(".pet-letter-drawer-btn");
    if (!drawer.length) {
      btn?.remove();
      return;
    }
    if (!btn) {
      btn = el("button", {
        className: "pet-letter-drawer-btn",
        type: "button",
        "aria-label": "打开信件抽屉",
      });
      host.append(btn);
      btn.addEventListener("click", () => {
        const latest = drawer[0];
        if (!latest) return;
        reopenDrawerLetter(state, latest.id);
        persist();
        renderProp();
        openOverlay();
      });
    }
    btn.innerHTML = `<span>抽屉</span><em>${drawer.length}</em>`;
  }

  function syncChatHint() {
    const sub = $("#room-chat-sub");
    const current = letter();
    if (sub && current && (current.status === "unread" || current.status === "opened")) {
      sub.textContent = `${pet.name}刚从市集回来，靠垫上有封信给你`;
    }
  }

  function mount() {
    if (!letter()) return;
    renderProp();
    renderToast();
    renderDrawerBtn();
    syncChatHint();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(showToast, reduced ? 80 : 700);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeOverlay();
  });

  mount();

  return { openOverlay, closeOverlay, remount: mount };
}
