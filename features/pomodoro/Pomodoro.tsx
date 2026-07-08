"use client";

import Timer from "./components/Timer";
import PomodoroControls from "./components/PomodoroControls";
import { formatDuration } from "./format";
import { usePomodoro } from "./usePomodoro";

export default function Pomodoro() {
    const {
        session,
        status,
        remainingSeconds,
        start,
        pause,
        resume,
        complete,
    } = usePomodoro();

    return (
        <>
        {/* {console.log('Render pomodoro')} */}
            <div className="bg-gray-900 w-full min-h-screen flex">
                {/* Timer section - 70% */}
                <div className="w-[70%] flex flex-col items-center pt-24 gap-12">

                    <Timer
                        remainingSeconds={remainingSeconds}
                        formattedTime={formatDuration(remainingSeconds)}
                        sessionType={session?.type ?? "focus"}
                    />

                    <PomodoroControls
                        status={status}
                        onStart={() => start("focus", 25 * 60)}
                        onPause={pause}
                        onResume={resume}
                        onComplete={complete}
                    />
                </div>

                {/* Right column - 30% */}
                <div className="w-[30%] bg-red-700">
                    {/* History / Tasks */}
                </div>
            </div>
        </>
    );
}