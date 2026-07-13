import { memo } from "react";
import { SessionStatus } from "../types";

interface PomodoroControlsProps {
    status: SessionStatus | null;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
}

const buttonClassName = "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"

function PomodoroControls({
    status,
    onStart,
    onPause,
    onResume
}: PomodoroControlsProps) {
    console.log("RENDERED POMODORO_CONTROLS")

    const isPaused = status === "paused";
    const canStart = status === null || status === "completed";
    const isRunning = status === "running";

    return (
        <div>
            {canStart && (
                <button onClick={onStart} className={buttonClassName}>
                    Start
                </button>
            )}

            {isRunning && (
                <button onClick={onPause} className={buttonClassName}>
                    Pause
                </button>
            )}

            {isPaused && (
                <button onClick={onResume} className={buttonClassName}>
                    Resume
                </button>
            )}
        </div>
    );
}

export default memo(PomodoroControls);
