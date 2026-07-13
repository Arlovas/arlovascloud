interface TimerDisplayProps {
    seconds: number;
}

export default function TimerDisplay({
    seconds,
}: TimerDisplayProps) {
    return (
        <div className="flex items-center justify-center">
            <h1 className="text-[5.5rem] font-bold text-white leading-none tracking-tight">
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
