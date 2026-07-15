import { memo } from "react";
import { SessionStatus, SessionType } from "../types";

interface PomodoroControlsProps {
    status: SessionStatus | null;
    sessionType: SessionType,
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onReset: () => void;
    onBreak: () => void;
}

function PomodoroControls({
    status,
    onStart,
    onPause,
    onResume,
    onReset,
    onBreak,
    sessionType,
}: PomodoroControlsProps) {
    const isPaused = status === "paused";
    const canStart = status === null || status === "completed";
    const isRunning = status === "running";
    const isBreak = sessionType === "shortBreak" || sessionType === "longBreak";

    let startGradiantColors = "bg-gradient-to-r from-red-600 to-red-800 shadow-red-500/25 hover:shadow-red-500/40 hover:from-red-400 hover:to-red-500";
    if (isBreak) {
        startGradiantColors = "bg-gradient-to-r from-blue-800 to-blue-950 shadow-blue-500/25 hover:shadow-blue-900/40 hover:from-blue-700 hover:to-blue-900";
    }

    return (
        <div className="flex items-center gap-4">
            {/* Reset button */}
            <button
                onClick={onReset}
                className="cursor-pointer z-10 flex items-center gap-2 px-5 py-3 rounded-full border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors bg-transparent"
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
                    className={`w-40 cursor-pointer z-10 flex items-center gap-2 px-10 py-3 rounded-full ${startGradiantColors} text-white font-semibold shadow-lg transition-all`}
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
                    className={`${startGradiantColors} w-40 cursor-pointer z-10 flex items-center gap-2 px-10 py-3 rounded-full text-white font-semibold shadow-lg transition-all`}
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
                    className={`${startGradiantColors} w-40 cursor-pointer z-10 flex items-center gap-2 px-10 py-3 rounded-full text-white font-semibold shadow-lg transition-all{}`}
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="text-sm">Resume</span>
                </button>
            )}

            <button
                onClick={onBreak}
                className="z-10 cursor-pointer flex items-center gap-2 px-5 py-3 rounded-full border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors bg-transparent"
            >
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8z" />
                </svg>
                <span className="text-sm font-medium">Break</span>
            </button>
        </div>
    );
}

export default memo(PomodoroControls);
