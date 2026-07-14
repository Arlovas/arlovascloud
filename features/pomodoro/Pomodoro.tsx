"use client";

import { useCallback } from "react";
import { usePomodoro } from "./usePomodoro";

import PomodoroControls from "./components/PomodoroControls";
import PomodoroTimer from "./components/PomodoroTimer";
import PomodoroLog from "./components/PomodoroLog";

// const POMODORO_DURATION_SECONDS = 25 * 60; // 25 minutes
const POMODORO_DURATION_SECONDS = 60; // DEBUG

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

    return (
        <main className="w-full h-screen flex" style={{ background: "#0d1117" }}>
            <section className="w-[65%] flex flex-col items-center">
                <div className="flex-[6] flex flex-col items-center justify-center gap-10">

                    <PomodoroTimer
                        session={session}
                        seconds={displaySeconds}

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

                </div>

                {/* TASKS */}
                {/*   */}
                <div className="w-full max-w-2xl flex-[4]">
                    <div className="w-full max-w-2xl rounded-3xl shadow-2xl backdrop-blur-xl bg-zinc-800/20  p-10">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                Today&apos;s Focus
                            </h2>

                            <button className="text-zinc-500 hover:text-zinc-300">•••</button>
                        </div>

                        <div className="space-y-5">
                            <label className="flex items-center gap-4 text-zinc-400">
                                <div className="h-5 w-5 rounded border border-zinc-600" />
                                <span>Build landing page hero section</span>
                            </label>

                            <label className="flex items-center gap-4 text-zinc-300">
                                <div className="flex h-5 w-5 items-center justify-center rounded bg-red-500 text-xs text-white">
                                    ✓
                                </div>
                                <span>Fix mobile layout issues</span>
                            </label>

                            <label className="flex items-center gap-4 text-zinc-500">
                                <div className="h-5 w-5 rounded border border-zinc-700" />
                                <span>Write blog post about productivity</span>
                            </label>
                        </div>

                        <button className="mt-8 flex items-center gap-3 text-zinc-500 transition hover:text-zinc-300">
                            <span className="text-3xl leading-none">+</span>
                            <span>Add a task</span>
                        </button>
                    </div>
                </div>
                {/* </div> */}

            </section>

            <aside className="w-[35%] pt-20 pr-8">

                <PomodoroLog />
            </aside>
        </main>
    );
}
