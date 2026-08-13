export function pad(n) {
  return String(n).padStart(2, "0");
}

export function toDayKey(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseDayKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDayLabel(key) {
  const d = parseDayKey(key);
  const week = ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
  return `${d.getMonth() + 1}月${d.getDate()}日 周${week}`;
}

export function monthMeta(year, monthIndex) {
  const first = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startWeekday = (first.getDay() + 6) % 7;
  return { year, monthIndex, daysInMonth, startWeekday, label: `${year}年${monthIndex + 1}月` };
}

/** Monday-first 6x7 month grid, including adjacent-month days. */
export function monthGrid(year, monthIndex) {
  const meta = monthMeta(year, monthIndex);
  const cells = [];
  const prevDays = new Date(year, monthIndex, 0).getDate();
  for (let i = meta.startWeekday - 1; i >= 0; i -= 1) {
    const date = new Date(year, monthIndex - 1, prevDays - i);
    cells.push({ date, key: toDayKey(date), outside: true });
  }
  for (let day = 1; day <= meta.daysInMonth; day += 1) {
    const date = new Date(year, monthIndex, day);
    cells.push({ date, key: toDayKey(date), outside: false });
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const date = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1);
    cells.push({ date, key: toDayKey(date), outside: true });
  }
  return { ...meta, cells };
}

export function startOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}