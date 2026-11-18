/**
 * Helpers for the looping product mockups (plain JS + Motion).
 * Same feel as the Next.js version: steps change every few seconds, numbers roll,
 * labels cross-fade. Loops only run while the mockup is on screen.
 */
import { animate, inView } from "motion";
import { reduceMotion } from "./motion";

/** Video-like easing (slow in, slow out). */
export const EASE_IN_OUT = [0.45, 0, 0.2, 1] as const;
/** Soft spring for things that appear. */
export const SOFT_SPRING = { type: "spring", stiffness: 210, damping: 26, mass: 0.9 } as const;

export type Render = (phase: number, cycle: number, instant: boolean) => void;

/**
 * Steps through `durations` (ms per phase) in a loop while `root` is on screen.
 * With reduced motion it shows `staticPhase` and stops.
 * Otherwise it resets to phase 0 right away (`render(0, 0, true)`), plays phase 0 when the
 * mockup first scrolls into view, then moves on every `durations[phase]` ms.
 * Tip: render the static (final) frame in the HTML, so the mockup looks complete without JS.
 */
export function loop(root: Element, durations: readonly number[], render: Render, staticPhase = durations.length - 1) {
  if (reduceMotion()) {
    render(staticPhase, 0, true);
    return;
  }
  render(0, 0, true);
  let phase = 0;
  let cycle = 0;
  let started = false;
  let timer: number | undefined;
  const tick = () => {
    timer = window.setTimeout(() => {
      phase = (phase + 1) % durations.length;
      if (phase === 0) cycle++;
      render(phase, cycle, false);
      tick();
    }, durations[phase]);
  };
  inView(
    root,
    () => {
      if (!started) {
        started = true;
        render(0, 0, false);
      }
      tick();
      return () => window.clearTimeout(timer);
    },
    { amount: 0.3 },
  );
}

/** Shows or hides a mockup item with a soft spring (hides instantly). */
export function appear(el: Element, show: boolean, delay = 0, instant = false) {
  animate(
    el,
    show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.98 },
    show && !instant ? { ...SOFT_SPRING, delay } : { duration: 0 },
  );
}

/** Fades a whole mockup out at the end of a loop and back in at the start. */
export function frame(el: Element, hidden: boolean, instant = false) {
  animate(
    el,
    { opacity: hidden ? 0 : 1, y: hidden ? -4 : 0, filter: hidden ? "blur(2px)" : "blur(0px)" },
    { duration: instant ? 0 : 0.6, ease: EASE_IN_OUT },
  );
}

/** Types `text` into `el` at a steady pace; `caret` is shown while typing. */
export function typeText(el: HTMLElement, caret: HTMLElement | null, text: string, { duration = 1.6, instant = false, empty = false } = {}) {
  if (instant) {
    el.textContent = empty ? "" : text;
    if (caret) caret.style.opacity = empty ? "1" : "0";
    return;
  }
  el.textContent = "";
  if (caret) caret.style.opacity = "1";
  animate(0, text.length, {
    duration,
    delay: 0.15,
    ease: "linear",
    onUpdate: (v) => {
      el.textContent = text.slice(0, Math.round(v));
      if (caret) caret.style.opacity = v < text.length ? "1" : "0";
    },
  });
}

/** Rolls the number in `el` to `value` (e.g. 18% → 51%). */
export function rollNumber(
  el: HTMLElement,
  value: number,
  { suffix = "", decimals = 0, duration = 1.1, instant = false }: { suffix?: string; decimals?: number; duration?: number; instant?: boolean } = {},
) {
  const from = Number(el.dataset.value ?? value);
  el.dataset.value = String(value);
  const format = (v: number) => `${v.toFixed(decimals)}${suffix}`;
  if (instant || from === value || duration === 0) {
    el.textContent = format(value);
    return;
  }
  animate(from, value, { duration, ease: EASE_IN_OUT, onUpdate: (v) => (el.textContent = format(v)) });
}

/**
 * Cross-fades the content of a swap box (soft blur + small lift).
 * The box needs `class="relative inline-grid"` and one child span with `class="col-start-1 row-start-1"`.
 * `content` is text, or a function that fills the new span.
 */
export function swapText(box: HTMLElement, key: string, content: string | ((span: HTMLElement) => void), instant = false) {
  if (box.dataset.key === key) return;
  box.dataset.key = key;
  const old = box.lastElementChild as HTMLElement | null;
  const next = document.createElement("span");
  next.className = "col-start-1 row-start-1";
  if (typeof content === "string") next.textContent = content;
  else content(next);

  if (instant) {
    box.replaceChildren(next);
    return;
  }
  if (old) {
    // Take the old text out of the layout while it fades, like Motion's "popLayout".
    old.style.position = "absolute";
    old.style.left = "0";
    old.style.top = "0";
    old.style.whiteSpace = "nowrap";
    animate(old, { opacity: 0, y: -5, filter: "blur(2px)" }, { duration: 0.45, ease: EASE_IN_OUT }).then(() => old.remove());
  }
  box.append(next);
  animate(next, { opacity: [0, 1], y: [5, 0], filter: ["blur(2px)", "blur(0px)"] }, { duration: 0.45, ease: EASE_IN_OUT });
}

/** Swaps a set of classes: removes every class in `all`, adds `on`. */
export function setClasses(el: Element, all: readonly string[], on: string) {
  all.forEach((c) => el.classList.remove(...c.split(" ")));
  el.classList.add(...on.split(" ").filter(Boolean));
}
