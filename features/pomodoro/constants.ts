import type { PomodoroSettings } from "./types";

export const DEFAULT_FOCUS_DURATION_SECONDS = 25 * 60;
export const DEFAULT_SHORT_BREAK_DURATION_SECONDS = 5 * 60;
export const DEFAULT_LONG_BREAK_DURATION_SECONDS = 15 * 60;

export const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
    focusDurationSeconds: DEFAULT_FOCUS_DURATION_SECONDS,
    shortBreakDurationSeconds: DEFAULT_SHORT_BREAK_DURATION_SECONDS,
    longBreakDurationSeconds: DEFAULT_LONG_BREAK_DURATION_SECONDS,
};

export function parseFormMinutesToSeconds(
    raw: FormDataEntryValue | null,
    fallbackSeconds: number,
): number {
    if (typeof raw !== "string") {
        return fallbackSeconds;
    }

    const minutes = Number.parseInt(raw.trim(), 10);
    if (!Number.isFinite(minutes) || minutes <= 0) {
        return fallbackSeconds;
    }

    return minutes * 60;
}
