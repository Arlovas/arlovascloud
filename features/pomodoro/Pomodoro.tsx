"use client";

import { useCallback } from "react";
import PomodoroControls from "./components/PomodoroControls";
import { usePomodoro } from "./usePomodoro";
import PomodoroTimer from "./components/PomodoroTimer";

// const POMODORO_DURATION_SECONDS = 25 * 60; // 25 minutes;
const POMODORO_DURATION_SECONDS = 10;

export default function Pomodoro() {
    // console.log("RENDERED POMODORO_PAI");

    const {
        start,
        pause,
        resume,
        status,
        session,
        remainingSeconds,
    } = usePomodoro();

    const isCompleted = status === "completed";
    const displaySeconds = remainingSeconds || POMODORO_DURATION_SECONDS;

    // Avoid re-creating the callback on every render
    // Keep the callback reference stable between renders
    const handleStart = useCallback(() => {
        start("focus", POMODORO_DURATION_SECONDS);
    }, [start]);

    return (
        <main className="bg-background w-full min-h-screen flex">
            <section className="w-[70%] flex flex-col items-center pt-24 gap-12">

                <PomodoroTimer session={session} seconds={displaySeconds} />

                <PomodoroControls
                    status={status}
                    onStart={handleStart}
                    onPause={pause}
                    onResume={resume}
                />

                {isCompleted && (
                    <p>Pomodoro completed!</p>
                )}

            </section>

            <aside className="w-[30%] ">
                {/* History / Tasks */}
            </aside>
        </main>
    );
}
