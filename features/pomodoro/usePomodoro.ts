"use client";

import { useEffect, useState } from "react";

import {
    PomodoroSession,
    SessionType,
} from "./types";

import {
    getProgress,
    getRemainingSeconds,
    getStatus,
} from "./calculations";

function createId() {
    const id = crypto.randomUUID();
    console.log("Creating random session ID:", id);
    return id;
}

export function usePomodoro() {
    const [session, setSession] = useState<PomodoroSession | null>(null);
    const [now, setNow] = useState(() => new Date());

    const status = getStatus(session);

    useEffect(() => {
        // Keep "now" synchronized whenever the session changes
        setNow(new Date());

        if (status !== "running") {
            return;
        }

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [status]);

    function start(
        type: SessionType,
        durationSeconds: number
    ) {
        const timestamp = new Date();

        console.log('HERE', durationSeconds)

        setSession({
            id: createId(),
            type,
            plannedDurationSeconds: durationSeconds,
            tasks: [],
            events: [
                {
                    type: "started",
                    timestamp,
                },
            ],
        });
    }

    function pause() {
        const timestamp = new Date();

        setSession(current => {
            if (!current || getStatus(current) !== "running") {
                return current;
            }

            return {
                ...current,
                events: [
                    ...current.events,
                    {
                        type: "pauseStarted",
                        timestamp,
                    },
                ],
            };
        });
    }

    function resume() {
        const timestamp = new Date();

        setSession(current => {
            if (!current || getStatus(current) !== "paused") {
                return current;
            }

            return {
                ...current,
                events: [
                    ...current.events,
                    {
                        type: "pauseEnded",
                        timestamp,
                    },
                ],
            };
        });
    }

    function complete() {
        const timestamp = new Date();

        setSession(current => {
            if (!current || getStatus(current) === "completed") {
                return current;
            }

            return {
                ...current,
                events: [
                    ...current.events,
                    {
                        type: "completed",
                        timestamp,
                    },
                ],
            };
        });
    }

    return {
        session,
        status,
        remainingSeconds: getRemainingSeconds(session, now),
        progress: getProgress(session, now),
        start,
        pause,
        resume,
        complete,
    };
}