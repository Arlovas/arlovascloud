import { NullableSession, NullableSessionStatus } from "./types";

/**
 * Returns the current status of a Pomodoro session based on its latest event.
 *
 * The session is event-driven, so the most recent event determines whether the
 * session is running, paused, completed, or has no valid status.
 *
 * events 
 * [started] → [pauseStarted] → [pauseEnded] → [pauseStarted] → [pauseEnded] → [completed]
 * 
 * 
 * @param session The Pomodoro session to evaluate, or `null`.
 * @returns The current session status, or `null` if there is no session or
 *          the session has no events.
 */
export function getStatus(session: NullableSession): NullableSessionStatus {
    if (!session) {
        return null;
    }

    // Most recent event
    const lastEvent = session.events.at(-1);

    switch (lastEvent?.type) {
        case "started":
        case "pauseEnded":
            return "running";

        case "pauseStarted":
            return "paused";

        case "completed":
            return "completed";

        default:
            return null;
    }
}

/**
 * Calculates the elapsed time between two timestamps.
 *
 * The returned value is clamped to a minimum of `0` to guard against
 * unexpected cases where the end time precedes the start time.
 *
 * @param start The start timestamp.
 * @param end The end timestamp.
 * @returns The elapsed time, in milliseconds.
 */
function getElapsedBetween(start: Date, end: Date): number {
    const elapsedMilliseconds = end.getTime() - start.getTime();

    return Math.max(0, elapsedMilliseconds);
}

/**
 * Calculates the total amount of time the Pomodoro session has been actively
 * running.
 *
 * The session is event-driven, so elapsed time is computed by summing all
 * running intervals:
 *
 *   started ──────────────> pauseStarted
 *              + elapsed
 *
 *   pauseEnded ───────────> completed
 *              + elapsed
 *
 * If the session is still running, the time from the last `started` or
 * `pauseEnded` event until `now` is also included.
 *
 * @param session The Pomodoro session to evaluate, or `null`.
 * @param now The current time used to calculate an active running interval.
 * @returns The total elapsed running time, in milliseconds.
 */
export function getElapsedMilliseconds(session: NullableSession, now: Date): number {
    if (!session) {
        return 0;
    }

    let elapsed = 0;
    let runningSince: Date | null = null;

    for (const event of session.events) {
        switch (event.type) {
            case "started":
                runningSince = event.timestamp;
                break;

            case "pauseStarted":
                if (runningSince) {
                    elapsed += getElapsedBetween(runningSince, event.timestamp)
                    runningSince = null;
                }
                break;

            case "pauseEnded":
                runningSince = event.timestamp;
                break;

            case "completed":
                if (runningSince) {
                    elapsed += getElapsedBetween(runningSince, event.timestamp)
                    runningSince = null;
                }
                break;
        }
    }

    // Still running
    if (runningSince) {
        elapsed += getElapsedBetween(runningSince, now);
    }

    return elapsed;
}


/**
 * Calculates the total elapsed running time of the session in seconds.
 *
 * This is a convenience wrapper around `getElapsedMilliseconds()`, converting
 * the result to whole seconds by rounding down.
 *
 * @param session The Pomodoro session to evaluate, or `null`.
 * @param now The current time used to calculate an active running interval.
 * @returns The total elapsed running time, in seconds.
 */
export function getElapsedSeconds(session: NullableSession, now: Date): number {
    return Math.floor(getElapsedMilliseconds(session, now) / 1000);
}

/**
 * Calculates the number of whole seconds remaining in the session.
 *
 * The remaining time is based on the planned session duration minus the
 * elapsed running time. The result is never negative.
 *
 * @param session The Pomodoro session to evaluate, or `null`.
 * @param now The current time used to calculate an active running interval.
 * @returns The number of remaining seconds, clamped to a minimum of `0`.
 */
export function getRemainingSeconds(session: NullableSession, now: Date): number | null {
    if (!session) {
        return null;
    }

    const durationMilliseconds = session.plannedDurationSeconds * 1000;
    const elapsedMilliseconds = getElapsedMilliseconds(session, now);
    const remainingSeconds = Math.ceil(
        (durationMilliseconds - elapsedMilliseconds) / 1000
    );

    return Math.max(0, remainingSeconds);
}

/**
 * Calculates the completion progress of the session.
 *
 * Progress is returned as a value between `0` and `1`, where:
 *
 *   0 = session has not started
 *   0.5 = session is halfway complete
 *   1 = session has completed
 *
 * @param session The Pomodoro session to evaluate, or `null`.
 * @param now The current time used to calculate an active running interval.
 * @returns The session progress as a value between `0` and `1`.
 */
export function getProgress(session: NullableSession, now: Date): number {
    if (!session) {
        return 0;
    }

    const durationMilliseconds = session.plannedDurationSeconds * 1000;
    const elapsedMilliseconds = getElapsedMilliseconds(session, now);

    return Math.min(Math.max(elapsedMilliseconds / durationMilliseconds, 0), 1);
}
