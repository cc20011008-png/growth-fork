import { loadState } from "./lib/store.js";
import { renderSidebar } from "./components/sidebar.js";
import { mountReportPage } from "./views/reportView.js";
import { mountBondPanel } from "./views/bondPanel.js";

const state = loadState();
renderSidebar(state, { active: "stats" });
const bond = mountBondPanel(state);
document.getElementById("open-bond")?.addEventListener("click", () => bond.open());
mountReportPage(state);