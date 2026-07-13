import { memo } from "react";

interface TimerMarkerProps {
    index: number;
}

function TimerMarker({
    index,
}: TimerMarkerProps) {
    const isMajor = index % 5 === 0;
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
                        ? "h-4 w-1 bg-red-500/80 mt-8"
                        : "h-2 w-px bg-red-400/40 mt-9"
                    }
                `}
            />
        </div>
    );
}

export default memo(TimerMarker);
