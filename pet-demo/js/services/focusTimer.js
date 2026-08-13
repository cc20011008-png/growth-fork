/** Lightweight focus timer controller. */
export function createFocusTimer({ minutes = 25, onTick, onDone }) {
  let remaining = Math.round(minutes * 60);
  let paused = false;
  let timerId = null;
  let running = false;

  function tick() {
    if (paused) return;
    remaining -= 1;
    onTick?.(remaining);
    if (remaining <= 0) {
      stop();
      onDone?.();
    }
  }

  function start() {
    if (running) return;
    running = true;
    paused = false;
    onTick?.(remaining);
    timerId = setInterval(tick, 1000);
  }

  function pause() {
    paused = true;
  }

  function resume() {
    if (!running) return;
    paused = false;
  }

  function stop() {
    running = false;
    paused = false;
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  function getRemaining() {
    return remaining;
  }

  function isPaused() {
    return paused;
  }

  function isRunning() {
    return running;
  }

  function elapsedMinutes(totalSeconds = Math.round(minutes * 60)) {
    return Math.max(1, Math.round((totalSeconds - remaining) / 60));
  }

  return { start, pause, resume, stop, getRemaining, isPaused, isRunning, elapsedMinutes };
}

export function formatRemain(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}