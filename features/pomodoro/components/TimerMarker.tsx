import { memo } from "react";

interface TimerMarkerProps {
    index: number;
}

function TimerMarker({
    index,
}: TimerMarkerProps) {
    const isMajor = index % 5 === 0;

    console.log("RENDERED TIMER_MARKER")

    return (
        <div
            className="absolute inset-0 flex justify-center"
            style={{
                transform: `rotate(${index * 6}deg)`,
            }}
        >
            <div
                className={`
                    mt-2 rounded-full
                    ${isMajor
                        ? "h-5 w-1.5 bg-red-500"
                        : "h-2 w-px bg-red-400"
                    }
                `}
            />
        </div>
    );
}

export default memo(TimerMarker);