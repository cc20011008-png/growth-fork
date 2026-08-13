(function () {
  const KEY = "growth-fork-companion-v1";
  const catalog = {
    "小猫": { name:"小猫", image:"assets/companion-cat-transparent.png", greeting:"慢一点也没关系，我们先走一小步。" },
    "小狗": { name:"小狗", image:"assets/companion-dog-transparent.png", greeting:"准备好了吗？我们现在就出发！" },
    "水豚": { name:"水豚", image:"assets/companion-capybara-transparent.png", greeting:"没完成也没关系，今天接着来。" }
  };
  function get() { try { const saved = JSON.parse(localStorage.getItem(KEY)); return catalog[saved?.name] || catalog["小猫"]; } catch (_) { return catalog["小猫"]; } }
  function set(name) { const companion = catalog[name] || catalog["小猫"]; localStorage.setItem(KEY, JSON.stringify({ name:companion.name })); return companion; }
  function invocation(skill, action) { const companion = get(); return `${companion.name}：正在调用「${skill}」，我们一起${action || "把这件事完成"}！`; }
  function avatarHtml() { const companion = get(); return `<span class="avatar companion-avatar"><img src="${companion.image}" alt="${companion.name}"></span>`; }
  window.GrowthCompanion = { get, set, invocation, avatarHtml, catalog };
})();
