import { getProgress, getStatus } from "../calculations";
import { PomodoroSession } from "../types";
import { useAnimationClock } from "../useAnimationClock";

interface CountdownRingProps {
    session: PomodoroSession | null;
}

const RADIUS = 228;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CountdownRing({ session }: CountdownRingProps) {
    const status = getStatus(session);
    const isRunning = status === "running";

    const now = useAnimationClock(isRunning);
    const progress = getProgress(session, now);


    // The ring draws from 100% down to 0% as progress increases.
    // strokeDashoffset moves clockwise when the SVG is rotated -90deg.
    const remainingProgress = 1 - progress;
    const strokeOffset = CIRCUMFERENCE * progress;

    // This is for the red mark (strong the tail 🔴)
    // Marker position: In SVG coordinate space (before CSS -rotate-90):
    // The arc starts at 0rad (3 o'clock in SVG, visually at 12 o'clock after CSS rotation).
    // The visible arc spans (1-progress) of the full circle going in the default direction.
    // The trailing edge of the visible arc is at angle (1-progress) * 2π in SVG space.
    const markerAngle = (1 - progress) * 2 * Math.PI;
    const markerX = 256 + RADIUS * Math.cos(markerAngle);
    const markerY = 256 + RADIUS * Math.sin(markerAngle);

    return (
        <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 512 512"
        >
            <defs>
                {/* Gradient for the progress ring */}
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b6b" />
                    <stop offset="50%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#ff4040" />
                </linearGradient>

                {/* Subtle glow filter */}
                <filter id="ringGlow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Background ring (subtle) */}
            <circle
                cx="256"
                cy="256"
                r={RADIUS}
                fill="transparent"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="6"
            />

            {/* Outer soft glow behind the ring (very subtle) */}
            <circle
                cx="256"
                cy="256"
                r={RADIUS}
                fill="transparent"
                stroke="rgba(239, 68, 68, 0.08)"
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
                stroke="url(#ringGradient)"
                strokeWidth="7"
                strokeLinecap={remainingProgress <= 0 ? "butt" : "round"}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeOffset}
                filter="url(#ringGlow)"
            />

            {/* Marker dot at the trailing edge of the remaining arc */}
            {progress > 0 && remainingProgress > 0 && (
                <circle
                    cx={markerX}
                    cy={markerY}
                    r="7"
                    fill="#ff6b6b"
                    filter="url(#ringGlow)"
                />
            )}
        </svg>
    );
}
