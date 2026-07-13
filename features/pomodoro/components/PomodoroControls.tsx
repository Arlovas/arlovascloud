import { memo } from "react";
import { SessionStatus } from "../types";

interface PomodoroControlsProps {
    status: SessionStatus | null;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onReset?: () => void;
    onSkip?: () => void;
}

function PomodoroControls({
    status,
    onStart,
    onPause,
    onResume,
    onReset,
    onSkip,
}: PomodoroControlsProps) {
    const isPaused = status === "paused";
    const canStart = status === null || status === "completed";
    const isRunning = status === "running";

    return (
        <div className="flex items-center gap-4">
            {/* Reset button */}
            <button
                onClick={onReset}
                className="z-10 flex items-center gap-2 px-5 py-3 rounded-full border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors bg-transparent"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 1 9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M3 22v-6h6" />
                </svg>
                <span className="text-sm font-medium">Reset</span>
            </button>

            {/* Start / Pause / Resume button */}
            {canStart && (
                <button
                    onClick={onStart}
                    className="z-10 flex items-center gap-2 px-10 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:from-red-400 hover:to-red-500 transition-all"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="text-sm">Start</span>
                </button>
            )}

            {isRunning && (
                <button
                    onClick={onPause}
                    className="z-10 flex items-center gap-2 px-10 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    <span className="text-sm">Pause</span>
                </button>
            )}

            {isPaused && (
                <button
                    onClick={onResume}
                    className="z-10 flex items-center gap-2 px-10 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="text-sm">Resume</span>
                </button>
            )}

            {/* Skip button */}
            <button
                onClick={onSkip}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors bg-transparent"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 4l10 8-10 8V4z" />
                    <rect x="17" y="5" width="2" height="14" />
                </svg>
                <span className="text-sm font-medium">Skip</span>
            </button>
        </div>
    );
}

export default memo(PomodoroControls);
