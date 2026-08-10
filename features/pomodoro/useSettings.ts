"use client";

import { useState } from "react";
import { DEFAULT_POMODORO_SETTINGS } from "./constants";
import { PomodoroSettings } from "./types";

const STORAGE_KEY = "pomodoroSettings";

function loadSettings(): PomodoroSettings {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch {
        // localStorage not available (SSR, private mode, etc.)
    }
    return DEFAULT_POMODORO_SETTINGS;
}

export function useSettings() {
    const [settings, setSettings] = useState<PomodoroSettings>(loadSettings);

    function updateSettings(newSettings: PomodoroSettings) {
        setSettings(newSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    }

    function resetToDefault() {
        setSettings(DEFAULT_POMODORO_SETTINGS);
        localStorage.removeItem(STORAGE_KEY);
    }

    return {
        settings,
        updateSettings,
        resetToDefault,
    };
}
