import { memo } from "react";
import { SessionType } from "../types";

interface TimerMarkerProps {
    index: number;
    sessionType: SessionType;
}

function TimerMarker({ sessionType, index }: TimerMarkerProps) {
    const isMajor = index % 5 === 0;
    const isBreak = sessionType === "shortBreak" || sessionType === "longBreak";

    const tickClass = isMajor
        ? isBreak
            ? "h-3 w-1 bg-blue-500/40 mt-8"
            : "h-3 w-1 bg-red-500/40 mt-8"
        : isBreak
          ? "h-2 w-px bg-blue-700/40 mt-9"
          : "h-2 w-px bg-red-700/40 mt-9";

    return (
        <div
            className="absolute inset-0 flex justify-center z-10"
            style={{
                transform: `rotate(${index * 6}deg)`,
            }}
        >
            <div className={`rounded-full ${tickClass}`} />
        </div>
    );
}

export default memo(TimerMarker);
