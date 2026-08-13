export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  const { className, dataset, style, on, ...rest } = props;
  if (className) node.className = className;
  if (dataset) Object.assign(node.dataset, dataset);
  if (style) Object.assign(node.style, style);
  if (on) {
    Object.entries(on).forEach(([event, handler]) => {
      node.addEventListener(event, handler);
    });
  }
  Object.entries(rest).forEach(([key, value]) => {
    if (value == null || value === false) return;
    if (key === "text") node.textContent = value;
    else if (key === "html") node.innerHTML = value;
    else node.setAttribute(key, value === true ? "" : String(value));
  });
  (Array.isArray(children) ? children : [children]).forEach((child) => {
    if (child == null || child === false) return;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  });
  return node;
}

export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function toast(message) {
  let host = $("#demo-toast");
  if (!host) {
    host = el("div", { id: "demo-toast", className: "toast" });
    document.body.append(host);
  }
  host.textContent = message;
  host.classList.add("show");
  clearTimeout(host._t);
  host._t = setTimeout(() => host.classList.remove("show"), 2200);
}