import { useEffect, useState } from "react";

/**
 * Provides a continuously updating clock while an animation is running.
 *
 * When enabled, the hook updates the current time on every animation frame
 * using `requestAnimationFrame`. When disabled, the clock stops updating and
 * retains its last value.
 *
 * This hook is useful for driving smooth, time-based UI animations without
 * relying on fixed intervals.
 *
 * @param isRunning Whether the animation clock should be active.
 * @returns The current time, updated on each animation frame while running.
 */
export function useAnimationClock(isRunning: boolean) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        let frameId: number;

        const tick = () => {
            setNow(new Date());
            frameId = requestAnimationFrame(tick);
        };

        // Synchronize immediately
        setNow(new Date());

        frameId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frameId);
    }, [isRunning]);

    return now;
}