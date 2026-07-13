"use client";

import { useCallback } from "react";
import { usePomodoro } from "./usePomodoro";

import PomodoroControls from "./components/PomodoroControls";
import PomodoroTimer from "./components/PomodoroTimer";

const POMODORO_DURATION_SECONDS = 25 * 60; // 25 minutes
// const POMODORO_DURATION_SECONDS = 60; // DEBUG

export default function Pomodoro() {
    const {
        start,
        pause,
        resume,
        status,
        session,
        reset,
        remainingSeconds,
    } = usePomodoro();

    // For now just used to show when complete
    const isCompleted = status === "completed";

    // The `||` operator is for refresh (F5) show the correct time
    let displaySeconds = remainingSeconds || POMODORO_DURATION_SECONDS;

    // Keep 00:00 on completion
    if (isCompleted) {
        displaySeconds = 0;
    }

    // Avoid re-creating the callback on every render
    // Keep the callback reference stable between renders
    const handleStart = useCallback(() => {
        start("focus", POMODORO_DURATION_SECONDS);
    }, [start]);

    const handleReset = useCallback(() => {
        // Reset by starting a new session
        start("focus", POMODORO_DURATION_SECONDS);
    }, [start]);

    return (
        <main className="w-full min-h-screen flex" style={{ background: "#0d1117" }}>
            <section className="w-[65%] flex flex-col items-center pt-20 gap-10">

                <PomodoroTimer
                    session={session}
                    seconds={displaySeconds}
                    currentPomodoro={1}
                    totalPomodoros={4}
                />

                <PomodoroControls
                    status={status}
                    onStart={handleStart}
                    onPause={pause}
                    onResume={resume}
                    onReset={reset}
                />

                {isCompleted && (
                    <p className="text-green-400 text-sm">Session completed! 🎉</p>
                )}

            </section>

            <aside className="w-[35%] pt-20 pr-8">
                {/* Pomodoro Log panel placeholder */}
            </aside>
        </main>
    );
}
