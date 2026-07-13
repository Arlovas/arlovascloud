interface TimerDisplayProps {
    seconds: number;
}

export default function TimerDisplay({
    seconds,
}: TimerDisplayProps) {

    console.log("RENDERED POMODORO_CONTROLS")


    return (
        <div className="z-10 flex-2 flex items-center justify-center">
            <h1 className="text-8xl font-bold text-white">
                {formatDuration(seconds)}
            </h1>
        </div>
    );
}

function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${formatUnit(minutes)}:${formatUnit(
        remainingSeconds
    )}`;
}

function formatUnit(value: number) {
    return value
        .toString()
        .padStart(2, "0");
}