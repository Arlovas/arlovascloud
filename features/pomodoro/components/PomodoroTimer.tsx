import { memo } from "react";

import { PomodoroSession, SessionType } from "../types";


import CountdownRing from "./CountdownRing";
import TimerDisplay from "./TimerDisplay";
import TimerMarker from "./TimerMarker";

const CLOCK_MARKERS = Array.from({ length: 60 });

const LABELS = {
    focus: {
        title: "Focus time",
        subtitle: "Deep work session",
    },
    shortBreak: {
        title: "Short break",
        subtitle: "Recharge",
    },
    longBreak: {
        title: "Long break",
        subtitle: "Recover",
    },
};

interface PomodoroTimerProps {
    session: PomodoroSession | null;
    seconds: number;
}

function PomodoroTimer({
    seconds,
    session,
}: PomodoroTimerProps) {
    return (
        <div className="relative w-128 h-128 rounded-full flex flex-col items-center justify-center overflow-hidden">

            <CountdownRing session={session} />

            {CLOCK_MARKERS.map((_, index) => (
                <TimerMarker
                    key={index}
                    index={index}
                />
            ))}

            <div className="z-10 flex-1 flex items-end justify-center pb-4">
                <p className="text-gray-400 text-lg tracking-widest uppercase">
                    {/* {labels.title} */}
                </p>
            </div>

            <TimerDisplay seconds={seconds} />

            <div className="z-10 flex-1 flex items-start justify-center pt-4">
                <p className="text-gray-400 text-lg">
                    {/* {labels.subtitle} */}
                </p>
            </div>

        </div>
    );
}

export default memo(PomodoroTimer);