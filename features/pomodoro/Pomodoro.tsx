"use client";

import { useCallback } from "react";
import PomodoroControls from "./components/PomodoroControls";
import { usePomodoro } from "./usePomodoro";

const POMODORO_DURATION_SECONDS = 25 * 60; // 25 minutes;

export default function Pomodoro() {
    console.log("RENDERED POMODORO");

    const {
        start,
        pause,
        resume,
        status,
        remainingSeconds
    } = usePomodoro();

    const isCompleted = status === "completed";
    const handleStart = useCallback(() => {
        start("focus", POMODORO_DURATION_SECONDS);
    }, [start]);

    return (
        <main className="bg-gray-900 w-full min-h-screen flex">
            <section className="w-[70%] flex flex-col items-center pt-24 gap-12">
                TOTAL TIME: {POMODORO_DURATION_SECONDS}
                <br />
                TIME LEEFT {remainingSeconds}

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

            <aside className="w-[30%] bg-red-700">
                {/* History / Tasks */}
            </aside>
        </main>
    );
}