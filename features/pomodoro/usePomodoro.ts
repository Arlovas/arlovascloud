"use client";

import { useCallback, useEffect, useState } from "react";
import { PomodoroSession, SessionType } from "./types";
import { getElapsedSeconds, getRemainingSeconds, getStatus } from "./calculations";
import { completeSession, createSession, pauseSession, resumeSession } from "./pomodoroSession";

export function usePomodoro() {
    const [now, setNow] = useState(() => new Date());
    const [session, setSession] = useState<PomodoroSession | null>(null);

    const status = getStatus(session);
    const isRunning = status === "running";
    const remainingSeconds = getRemainingSeconds(session, now);

    console.log('CURRENT STATUS', status);

    const complete = useCallback(() => {
        const timestamp = new Date();

        setSession(current => {
            if (!current) {
                return current;
            }

            return completeSession(current, timestamp);
        });
    }, []);

    const resume = useCallback(() => {
        const timestamp = new Date();

        setSession(current => {
            if (!current) {
                return current;
            }

            return resumeSession(current, timestamp);
        });

        setNow(timestamp);
    }, []);

    const pause = useCallback(() => {
        const timestamp = new Date();

        setSession(current => {
            if (!current) {
                return current;
            }

            return pauseSession(current, timestamp);
        });
    }, []);


    const start = useCallback((sessionType: SessionType, plannedDurationSeconds: number) => {
        const timestamp = new Date();
        const newSession = createSession(sessionType, plannedDurationSeconds, timestamp)

        setNow(timestamp);
        setSession(newSession);
    }, []);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (!session) return;
        if (status !== "running") return;


        const elapsed = getElapsedSeconds(session, now);

        if (elapsed >= session.plannedDurationSeconds) {
            complete();
        }

    }, [now, session, complete]);

    return {
        start,
        pause,
        resume,
        status,
        session,
        remainingSeconds
    }
}
