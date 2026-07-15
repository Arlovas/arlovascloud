import { getProgress, getStatus } from "../calculations";
import { PomodoroSession, SessionType } from "../types";
import { useAnimationClock } from "../useAnimationClock";

interface CountdownRingProps {
    session: PomodoroSession | null;
    sessionType: SessionType
}

const RADIUS = 228;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CountdownRing({ session, sessionType }: CountdownRingProps) {
    const status = getStatus(session);
    const isRunning = status === "running";

    const now = useAnimationClock(isRunning);
    const progress = getProgress(session, now);

    const isBreak = sessionType === "shortBreak" || sessionType === "longBreak";

    const colors = isBreak
        ? {
            gradientStart: "#d7f0ff",
            gradientMiddle: "#60a5fa",
            gradientEnd: "#3b82f6",
            glow: "rgba(59,130,246,0.08)",
            marker: "#60a5fa",
        }
        : {
            gradientStart: "#dcd4d4",
            gradientMiddle: "#ef4444",
            gradientEnd: "#ff4040",
            glow: "rgba(239,68,68,0.08)",
            marker: "#ff6b6b",
        };

    // The ring draws from 100% down to 0% as progress increases.
    const remainingProgress = 1 - progress;
    const strokeOffset = CIRCUMFERENCE * progress;

    // Marker position
    const markerAngle = (1 - progress) * 2 * Math.PI;
    const markerX = 256 + RADIUS * Math.cos(markerAngle);
    const markerY = 256 + RADIUS * Math.sin(markerAngle);

    return (
        <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 512 512"
        >
            <defs>
                <linearGradient
                    id="countdownGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor={colors.gradientStart} />
                    <stop offset="50%" stopColor={colors.gradientMiddle} />
                    <stop offset="100%" stopColor={colors.gradientEnd} />
                </linearGradient>

                <filter
                    id="ringGlow"
                    x="-10%"
                    y="-10%"
                    width="120%"
                    height="120%"
                >
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite
                        in="SourceGraphic"
                        in2="blur"
                        operator="over"
                    />
                </filter>
            </defs>

            {/* Background ring */}
            <circle
                cx="256"
                cy="256"
                r={RADIUS}
                fill="transparent"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="6"
            />

            {/* Outer glow */}
            <circle
                cx="256"
                cy="256"
                r={RADIUS}
                fill="transparent"
                stroke={colors.glow}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeOffset}
            />

            {/* Main countdown ring */}
            <circle
                cx="256"
                cy="256"
                r={RADIUS}
                fill="transparent"
                stroke="url(#countdownGradient)"
                strokeWidth="7"
                strokeLinecap={remainingProgress <= 0 ? "butt" : "round"}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeOffset}
                filter="url(#ringGlow)"
            />

            {/* Marker */}
            {progress > 0 && remainingProgress > 0 && (
                <circle
                    cx={markerX}
                    cy={markerY}
                    r="7"
                    fill={colors.marker}
                    filter="url(#ringGlow)"
                />
            )}
        </svg>
    );
}
