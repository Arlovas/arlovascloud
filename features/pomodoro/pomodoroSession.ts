import { PomodoroSession, SessionType } from "./types";
import { getStatus } from "./calculations";

function createId() {
    return crypto.randomUUID();
}

/**
 * Creates a new Pomodoro session with an initial started event.
 */
export function createSession(
    type: SessionType,
    plannedDurationSeconds: number,
    timestamp: Date
): PomodoroSession {
    return {
        id: createId(),
        type,
        plannedDurationSeconds,
        tasks: [],
        events: [
            {
                type: "started",
                timestamp,
            },
        ],
    };
}

/**
 * Adds a pause event to a running session.
 * Returns the original session if it cannot be paused.
 */
export function pauseSession(
    session: PomodoroSession,
    timestamp: Date
): PomodoroSession {
    if (getStatus(session) !== "running") {
        return session;
    }

    return {
        ...session,
        events: [
            ...session.events,
            {
                type: "pauseStarted",
                timestamp,
            },
        ],
    };
}

/**
 * Adds a resume event to a paused session.
 * Returns the original session if it cannot be resumed.
 */
export function resumeSession(
    session: PomodoroSession,
    timestamp: Date
): PomodoroSession {
    if (getStatus(session) !== "paused") {
        return session;
    }

    return {
        ...session,
        events: [
            ...session.events,
            {
                type: "pauseEnded",
                timestamp,
            },
        ],
    };
}

/**
 * Adds a completed event to a running session.
 * Returns the original session if it cannot be completed.
 */
export function completeSession(
    session: PomodoroSession,
    timestamp: Date
): PomodoroSession {
    if (getStatus(session) !== "running") {
        return session;
    }

    return {
        ...session,
        events: [
            ...session.events,
            {
                type: "completed",
                timestamp,
            },
        ],
    };
}
