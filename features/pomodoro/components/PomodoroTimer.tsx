import { memo } from "react";

import { PomodoroSession } from "../types";

import CountdownRing from "./CountdownRing";
import TimerDisplay from "./TimerDisplay";
import TimerMarker from "./TimerMarker";

const CLOCK_MARKERS = Array.from({ length: 60 });

interface PomodoroTimerProps {
    session: PomodoroSession | null;
    seconds: number;
    currentPomodoro?: number;
    totalPomodoros?: number;
}

function PomodoroTimer({
    seconds,
    session,
    currentPomodoro = 1,
    totalPomodoros = 4,
}: PomodoroTimerProps) {
    return (
        <div className="relative w-[420px] h-[420px] rounded-full flex flex-col items-center justify-center">
            {/* Outer ambient glow (very subtle) */}
            <div className="absolute inset-[-15px] rounded-full bg-red-500/3 blur-lg" />

            {/* Ring (behind markers) */}
            <CountdownRing session={session} />

            {/* Clock markers (on top of ring) */}
            {CLOCK_MARKERS.map((_, index) => (
                <TimerMarker key={index} index={index} />
            ))}

            {/* Tomato marker at the top */}
            {/* <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20">
                <span className="text-2xl">🍅</span>
            </div> */}

            {/* Center content */}
            <div className="z-10 flex flex-col items-center justify-center gap-2">
                {/* Focus time label */}
                {/* <span className="text-2xl">🍅</span> */}

                <div className="flex items-center gap-2">
                    
                    <span className="text-red-400 text-xs">✦</span>
                    <p className="text-gray-400 text-sm tracking-[0.2em] uppercase font-medium">
                        Focus Time
                    </p>
                    <span className="text-red-400 text-xs">✦</span>
                </div>

                {/* Timer digits */}
                <TimerDisplay seconds={seconds} />

                {/* Pomodoro counter */}
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-base">🍅</span>
                    <p className="text-gray-400 text-sm tracking-wider uppercase">
                        Pomodoro {currentPomodoro}/{totalPomodoros}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default memo(PomodoroTimer);
