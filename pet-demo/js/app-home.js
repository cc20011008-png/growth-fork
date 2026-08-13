import { loadState, getPet } from "./lib/store.js";
import { renderNav } from "./components/nav.js";
import { mountOnboarding } from "./views/onboarding.js";
import { mountHomeChat } from "./views/homeChat.js";
import { mountBondPanel } from "./views/bondPanel.js";

const state = loadState();

function boot() {
  const paintNav = () => {
    const pet = state.onboarded ? getPet(state) : null;
    renderNav({
      active: "home",
      pet,
      userName: state.profile.name || "同学",
      mode: "home",
    });
  };

  paintNav();
  const bond = mountBondPanel(state);

  const bindBond = () => {
    document.getElementById("open-bond")?.addEventListener("click", () => bond.open());
    document.getElementById("open-bond-profile")?.addEventListener("click", () => bond.open());
  };

  const start = () => {
    paintNav();
    bindBond();
    mountHomeChat(state);
  };

  mountOnboarding(state, { onDone: start });
  if (state.onboarded) start();
  else bindBond();
}

boot();