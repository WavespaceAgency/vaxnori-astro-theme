export const statusTones = {
  progress: "bg-status-progress-bg text-status-progress",
  todo: "bg-status-todo-bg text-status-todo",
  done: "bg-status-done-bg text-status-done",
  queued: "bg-status-queued-bg text-status-queued",
  neutral: "border border-line bg-canvas text-subtle",
} as const;

export type StatusTone = keyof typeof statusTones;

export const badgeBase =
  "inline-flex items-center rounded-[3px] px-1.5 py-0.5 text-[10px] leading-[14px] font-semibold tracking-[0.02em] whitespace-nowrap";
