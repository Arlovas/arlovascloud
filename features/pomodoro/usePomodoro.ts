"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PomodoroSession, SessionType } from "./types";
import { getElapsedMilliseconds, getElapsedSeconds, getRemainingSeconds, getStatus } from "./calculations";
import { completeSession, createSession, pauseSession, resumeSession } from "./pomodoroSession";
import { useCompletionWorker } from "./useCompletionWorker";

export function usePomodoro() {
    const [session, setSession] = useState<PomodoroSession | null>(null);
    const [now, setNow] = useState(() => new Date());

    const status = getStatus(session);
    const isRunning = status === "running";
    const remainingSeconds = getRemainingSeconds(session, now);

    console.log("[usePomodoro] status:", status, "| remainingSeconds:", remainingSeconds);

    // ─── Completion callback ─────────────────────────────────────────────
    const complete = useCallback(() => {
        const timestamp = new Date();
        console.log("[usePomodoro] Completing session at", timestamp.toISOString());

        setSession(current => {
            if (!current) {
                return current;
            }

            return completeSession(current, timestamp);
        });
    }, []);

    // ─── Worker-based completion (immune to background throttling) ────────
    // Calculate remaining ms for the worker. null = don't run.
    const remainingMsForWorker = useMemo(() => {
        if (!session || status !== "running") return null;

        const elapsedMs = getElapsedMilliseconds(session, new Date());
        const totalMs = session.plannedDurationSeconds * 1000;
        const remaining = totalMs - elapsedMs;

        console.log("[usePomodoro] Worker remainingMs calculated:", remaining);

        return remaining > 0 ? remaining : null;
        // Recalculate when session events change (start/pause/resume) or status changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.events.length, status]);

    useCompletionWorker(remainingMsForWorker, complete);

    // ─── Visibility change safety net ────────────────────────────────────
    // When the user returns to the tab, immediately check if the session
    // should have completed (covers edge cases where even the worker was killed).
    useEffect(() => {
        if (status !== "running" || !session) return;

        const handleVisibility = () => {
            if (document.visibilityState === "visible") {
                const elapsed = getElapsedSeconds(session, new Date());
                console.log("[usePomodoro] Tab visible again. Elapsed:", elapsed, "/ Duration:", session.plannedDurationSeconds);

                // Update display immediately
                setNow(new Date());

                if (elapsed >= session.plannedDurationSeconds) {
                    console.log("[usePomodoro] Session should have completed while tab was hidden. Completing now.");
                    complete();
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);
        console.log("[usePomodoro] visibilitychange listener attached");

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            console.log("[usePomodoro] visibilitychange listener removed");
        };
    }, [session, status, complete]);

    // ─── Actions ─────────────────────────────────────────────────────────
    const resume = useCallback(() => {
        const timestamp = new Date();
        console.log("[usePomodoro] Resuming at", timestamp.toISOString());

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
        console.log("[usePomodoro] Pausing at", timestamp.toISOString());

        setSession(current => {
            if (!current) {
                return current;
            }

            return pauseSession(current, timestamp);
        });
    }, []);

    const start = useCallback((sessionType: SessionType, plannedDurationSeconds: number) => {
        const timestamp = new Date();
        console.log("[usePomodoro] Starting", sessionType, "session for", plannedDurationSeconds, "seconds");

        const newSession = createSession(sessionType, plannedDurationSeconds, timestamp);

        setNow(timestamp);
        setSession(newSession);
    }, []);

    // ─── 1-second interval for display updates ───────────────────────────
    // This only drives the TimerDisplay digits. Completion is handled by the worker.
    useEffect(() => {
        if (!isRunning) return;

        console.log("[usePomodoro] Starting 1s display interval");

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
            console.log("[usePomodoro] Cleared 1s display interval");
        };
    }, [isRunning]);

    // ─── Fallback completion check (belt + suspenders) ───────────────────
    // If for any reason the worker message arrives late, catch it here too.
    useEffect(() => {
        if (!session) return;
        if (status !== "running") return;

        const elapsed = getElapsedSeconds(session, now);

        if (elapsed >= session.plannedDurationSeconds) {
            console.log("[usePomodoro] Fallback: interval detected completion. Elapsed:", elapsed);
            complete();
        }
    }, [now, session, status, complete]);

    return {
        start,
        pause,
        resume,
        status,
        session,
        remainingSeconds,
    };
}
