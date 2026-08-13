import { $ } from "../lib/dom.js";
import { getPet } from "../lib/store.js";
import { buildMonthlyReport } from "../services/calendarAgent.js";
import { formatDayLabel } from "../lib/date.js";

export function mountReportPage(state) {
  const now = new Date();
  const pet = getPet(state);
  const report = buildMonthlyReport(state, now.getFullYear(), now.getMonth(), pet.name);

  $("#report-pet").src = pet.image;
  $("#report-title").textContent = `${now.getMonth() + 1}月成长小结 · ${pet.name}写给你`;
  $("#report-letter").textContent = report.narrative;
  $("#m-focus").textContent = `${report.focusMinutes}`;
  $("#m-battles").textContent = `${report.battles}`;
  $("#m-skills").textContent = `${report.skillUses}`;

  const highlights = $("#report-highlights");
  highlights.innerHTML = report.highlights.length
    ? report.highlights
        .map((h) => `<li>${formatDayLabel(h.key)} · ${h.title}${h.skillTitle ? `（${h.skillTitle}）` : ""}</li>`)
        .join("")
    : "<li>这个月还没有高光，先去打完一场今日计划吧。</li>";

  $("#report-top-skill").textContent = report.topSkill
    ? `最帮到你的 Skill：${report.topSkill.title}（${report.topSkill.count} 次）`
    : "本月还没有 Skill 实战记录。";

  $("#report-tip").textContent = report.tip;
  $("#report-reflections").textContent = `你写下了 ${report.reflections} 天学习感悟。`;
}