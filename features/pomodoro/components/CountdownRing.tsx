import { getProgress, getStatus } from "../calculations";
import { PomodoroSession } from "../types";
import { useAnimationClock } from "../useAnimationClock";

interface CountdownRingProps {
    session: PomodoroSession | null;
}

const RADIUS = 245;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CountdownRing({
    session,
}: CountdownRingProps) {
    const status = getStatus(session);
    const isRunning = status === "running";

    const now = useAnimationClock(isRunning);

    console.log('RENDERED CountdownRing')

    const progress = getProgress(session, now);


    const remainingProgress = 1 - progress;

    const strokeOffset =
        CIRCUMFERENCE * (1 - remainingProgress);


    return (
        <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 512 512"
        >
            {/* Background ring */}
            <circle
                cx="256"
                cy="256"
                r={RADIUS}
                fill="transparent"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="8"
            />

            {/* Countdown ring */}
            <circle
                cx="256"
                cy="256"
                r={RADIUS}
                fill="transparent"
                stroke="#ef4444"
                strokeWidth="10"
                strokeLinecap={
                    remainingProgress <= 0
                        ? "butt"
                        : "round"
                }
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeOffset}
            />
        </svg>
    );
}