import { loadState } from "./lib/store.js";
import { renderSidebar } from "./components/sidebar.js";
import { mountOnboarding } from "./views/onboarding.js";
import { mountTodayPlan } from "./views/todayPlan.js";
import { mountBondPanel } from "./views/bondPanel.js";

const state = loadState();

function start() {
  renderSidebar(state, { active: "plan" });
  const bond = mountBondPanel(state);
  document.getElementById("open-bond")?.addEventListener("click", () => bond.open());
  mountTodayPlan(state);
}

mountOnboarding(state, { onDone: start });
if (state.onboarded) start();
