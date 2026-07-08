import { SessionStatus } from "../types";

interface Props {
    status: SessionStatus | null;

    onStart(): void;
    onPause(): void;
    onResume(): void;
    onComplete(): void;
}

export default function PomodoroControls({
    status,
    onStart,
    onPause,
    onResume,
    onComplete,
}: Props) {
    return (
        <>
            {/* {console.log('Render controls')} */}
            <div className="flex gap-4">
                {!status && (
                    <button
                        onClick={onStart}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Start
                    </button>
                )}

                {status === "running" && (
                    <button
                        onClick={onPause}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Pause
                    </button>
                )}

                {status === "paused" && (
                    <button
                        onClick={onResume}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Resume
                    </button>
                )}

                {status && status !== "completed" && (
                    <button
                        onClick={onComplete}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Complete
                    </button>
                )}
            </div>
        </>
    );
}