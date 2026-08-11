"use client";

import { useEffect, useRef } from "react";
import { usePomodoro } from "./usePomodoro";

import PomodoroControls from "./components/PomodoroControls";
import PomodoroTimer from "./components/PomodoroTimer";
import PomodoroLog from "./components/PomodoroLog";
import PomodoroTask from "./components/PomodoroTask";
import { useSettings } from "./useSettings";
import PomodoroSettings from "./components/PomodoroSettings";
import { Skeleton } from "@/components/ui/skeleton";

/** Matches timer (450px) + controls + status line + gaps + section padding */
const TIMER_STACK_MIN_HEIGHT = "min-h-[650px]";

function PomodoroTimerStackSkeleton() {
    return (
        <>
            <Skeleton className="h-[450px] w-[450px] rounded-full bg-zinc-800/50" />
            <Skeleton className="h-12 w-[min(100%,22rem)] rounded-full bg-zinc-800/50" />
            <Skeleton className="h-5 w-40 bg-zinc-800/40" />
        </>
    );
}

export default function Pomodoro() {
    const { settings, updateSettings, resetToDefault, hydrated } = useSettings();

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
        focusDurationSeconds: settings.focusDurationSeconds,
        shortBreakDurationSeconds: settings.shortBreakDurationSeconds,
    });

    const isCompleted = status === "completed";
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio("/sounds/public_sounds_Pomodoro_end_Startup.mp3");
        audioRef.current.volume = 0.1;
    }, []);

    useEffect(() => {
        if (!isCompleted || !audioRef.current) {
            return;
        }

        audioRef.current.currentTime = 0;
        audioRef.current.play();
    }, [isCompleted]);

    let displaySeconds = remainingSeconds ?? pendingSession.plannedDurationSeconds;

    if (isCompleted) {
        displaySeconds = 0;
    }

    return (
        <main className="flex h-full min-h-0 w-full flex-1 overflow-hidden">
            <section className="flex min-h-0 w-[65%] flex-1 flex-col items-center overflow-hidden">
                <div
                    className={`flex shrink-0 flex-col items-center justify-center gap-10 py-6 ${TIMER_STACK_MIN_HEIGHT}`}
                >
                    {hydrated ? (
                        <>
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
                        </>
                    ) : (
                        <PomodoroTimerStackSkeleton />
                    )}
                </div>

                <PomodoroTask />
            </section>

            <aside className="flex min-h-0 w-[35%] flex-col overflow-y-auto pt-20 pr-8">
                <PomodoroLog />
                <br />
                <PomodoroSettings settings={settings} updateSettings={updateSettings} resetToDefault={resetToDefault} />
            </aside>
        </main>
    );
}
