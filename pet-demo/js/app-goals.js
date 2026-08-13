import { loadState } from "./lib/store.js";
import { renderSidebar } from "./components/sidebar.js";
import { mountGoals } from "./views/goalsView.js";
import { mountBondPanel } from "./views/bondPanel.js";

const state = loadState();
renderSidebar(state, { active: "goals" });
const bond = mountBondPanel(state);
document.getElementById("open-bond")?.addEventListener("click", () => bond.open());
mountGoals(state);
