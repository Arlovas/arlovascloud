import { memo } from "react";
import { PomodoroSession, SessionType } from "../types";

interface TimerMarkerProps {
    index: number;
    sessionType: SessionType
}

function TimerMarker({
    sessionType,
    index
}: TimerMarkerProps) {
    const isMajor = index % 5 === 0;

    const isBreak = sessionType === "shortBreak" || sessionType === "longBreak";
    const colors = isBreak ? 'bg-blue' : 'bg-red';

    return (
        <div
            className="absolute inset-0 flex justify-center z-10"
            style={{
                transform: `rotate(${index * 6}deg)`,
            }}
        >
            <div
                className={`
                    rounded-full
                    ${isMajor
                        ? `h-3 w-1 ${colors}-500/40 mt-8`
                        : `h-2 w-px ${colors}-700/40 mt-9`
                    }
                `}
            />
        </div>
    );
}

export default memo(TimerMarker);
