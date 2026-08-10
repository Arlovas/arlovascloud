"use client";

import { useEffect, useRef, useState } from "react";
import { usePomodoro } from "./usePomodoro";

import PomodoroControls from "./components/PomodoroControls";
import PomodoroTimer from "./components/PomodoroTimer";
import PomodoroLog from "./components/PomodoroLog";
import PomodoroTask from "./components/PomodoroTask";
import { useSettings } from "./useSettings";
import PomodoroSettings from "./components/PomodoroSettings";


export default function Pomodoro() {
    const [mounted, setMounted] = useState(false);
    const { settings, updateSettings, resetToDefault } = useSettings();

    useEffect(() => {
        setMounted(true);
    }, []);

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
        <main className="w-full h-screen flex">
            <section className="w-[65%] flex flex-col items-center">
                <div className="flex-6 flex flex-col items-center justify-center gap-10">

                    {mounted && (
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
                    )}

                </div>

                <PomodoroTask />
            </section>

            <aside className="w-[35%] pt-20 pr-8">
                <PomodoroLog />
                    <br />
                <PomodoroSettings settings={settings} updateSettings={updateSettings} resetToDefault={resetToDefault} />
            </aside>
        </main>
    );
}
