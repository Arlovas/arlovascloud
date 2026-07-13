import { useEffect, useState } from "react";

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