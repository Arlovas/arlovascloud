"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePomodoro } from "./usePomodoro";

import PomodoroControls from "./components/PomodoroControls";
import PomodoroTimer from "./components/PomodoroTimer";
import PomodoroLog from "./components/PomodoroLog";
import PomodoroTask from "./components/PomodoroTask";

// const POMODORO_DURATION_SECONDS = 25 * 60; // 25 minutes
const POMODORO_DURATION_SECONDS = 10; // DEBUG
const SHORT_BREAK_DURATION_SECONDS = 2; // DEBUG

export default function Pomodoro() {
    const {
        start,
        pause,
        resume,
        status,
        session,
        reset,
        remainingSeconds,
        selectBreak,
        pendingSession
    } = usePomodoro({
        focusDurationSeconds: POMODORO_DURATION_SECONDS,
        shortBreakDurationSeconds: SHORT_BREAK_DURATION_SECONDS,
    });

    // For now just used to show when complete
    const isCompleted = status === "completed";
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Create the audio once
    useEffect(() => {
        audioRef.current = new Audio("/sounds/public_sounds_Pomodoro_end_Startup.mp3");
        audioRef.current.volume = 0.1;
    }, []);

    // Play it whenever the session completes
    useEffect(() => {
        if (!isCompleted || !audioRef.current) {
            return;
        }

        audioRef.current.currentTime = 0;
        audioRef.current.play();
    }, [isCompleted]);

    // The `||` operator is for refresh (F5) show the correct time
    let displaySeconds = remainingSeconds ?? pendingSession.plannedDurationSeconds;

    // Keep 00:00 on completion
    if (isCompleted) {
        displaySeconds = 0;
    }

    return (
        <main className="w-full h-screen flex" style={{ background: "#0d1117" }}>
            <section className="w-[65%] flex flex-col items-center">
                <div className="flex-6 flex flex-col items-center justify-center gap-10">

                    <PomodoroTimer
                        sessionType={pendingSession.type}
                        session={session}
                        seconds={displaySeconds}
                        totalPomodoros={4}
                    />

                    <PomodoroControls
                        status={status}
                        onStart={start}
                        onPause={pause}
                        onResume={resume}
                        onReset={reset}
                        onBreak={selectBreak}
                        sessionType={pendingSession.type}
                    />

                    <p className={`h-5 text-sm text-green-400 ${isCompleted ? "visible" : "invisible"}`}>
                        Session completed! 🎉
                    </p>

                </div>

                <PomodoroTask />
            </section>

            <aside className="w-[35%] pt-20 pr-8">
                <PomodoroLog />
            </aside>
        </main>
    );
}
