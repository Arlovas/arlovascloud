import { memo } from "react";

import { PomodoroSession, SessionType } from "../types";

import CountdownRing from "./CountdownRing";
import TimerDisplay from "./TimerDisplay";
import TimerMarker from "./TimerMarker";

const CLOCK_MARKERS = Array.from({ length: 60 });

interface PomodoroTimerProps {
    sessionType: SessionType;
    session: PomodoroSession | null;
    seconds: number;
    currentPomodoro?: number;
    totalPomodoros?: number;
}

const SESSION_LABELS: Record<SessionType, string> = {
    focus: "FOCUS TIME",
    shortBreak: "SHORT BREAK",
    longBreak: "LONG BREAK",
};

function PomodoroTimer({
    seconds,
    session,
    sessionType,
    currentPomodoro = 1,
    totalPomodoros = 4,
}: PomodoroTimerProps) {

    return (
        <div className="relative w-[450px] h-[450px] rounded-full flex flex-col items-center justify-center">
            {/* Outer ambient glow (very subtle) */}
            <div className="absolute inset-[-15px] rounded-full bg-red-500/3 blur-lg" />

            {/* Ring (behind markers) */}
            <CountdownRing session={session} sessionType={sessionType} />

            {/* Clock markers (on top of ring) */}
            {CLOCK_MARKERS.map((_, index) => (
                <TimerMarker key={index} index={index} />
            ))}

            {/* Center content */}
            <div className="z-10 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2">

                    <span className="text-red-400 text-xs">✦</span>
                    <p className="text-gray-400 text-sm tracking-[0.2em] uppercase font-medium">
                        {SESSION_LABELS[sessionType]}
                    </p>
                    <span className="text-red-400 text-xs">✦</span>
                </div>

                {/* Timer digits */}
                <TimerDisplay seconds={seconds} />

                {/* Pomodoro counter */}
                <div className="flex items-center gap-2 mt-1 bg-backgroundfade rounded-4xl py-2 px-4">
                    <span className="text-base ">🍅</span>
                    <p className="text-gray-400 text-sm tracking-wider uppercase">
                        Pomodoro {currentPomodoro}/{totalPomodoros}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default memo(PomodoroTimer);
