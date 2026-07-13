import { PomodoroSession, SessionStatus } from "./types";

export function getStatus(session: PomodoroSession | null): SessionStatus | null {
    if (!session) {
        return null;
    }

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

export function getElapsedMilliseconds(session: PomodoroSession | null, now: Date): number {
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
                    elapsed += Math.max(
                        0,
                        event.timestamp.getTime() -
                        runningSince.getTime()
                    );

                    runningSince = null;
                }
                break;

            case "pauseEnded":
                runningSince = event.timestamp;
                break;

            case "completed":
                if (runningSince) {
                    elapsed += Math.max(
                        0,
                        event.timestamp.getTime() -
                        runningSince.getTime()
                    );

                    runningSince = null;
                }
                break;
        }
    }

    // Still running
    if (runningSince) {
        elapsed += Math.max(
            0,
            now.getTime() - runningSince.getTime()
        );
    }

    return elapsed;
}

export function getElapsedSeconds(
    session: PomodoroSession | null,
    now: Date
): number {
    return Math.floor(
        getElapsedMilliseconds(session, now) / 1000
    );
}

export function getRemainingSeconds(
    session: PomodoroSession | null,
    now: Date
): number {
    if (!session) {
        return 0;
    }

    const durationMilliseconds =
        session.plannedDurationSeconds * 1000;

    const elapsedMilliseconds =
        getElapsedMilliseconds(session, now);

    return Math.max(
        0,
        Math.ceil(
            (durationMilliseconds - elapsedMilliseconds) /
            1000
        )
    );
}

export function getProgress(
    session: PomodoroSession | null,
    now: Date
): number {
    if (!session) {
        return 0;
    }

    const durationMilliseconds =
        session.plannedDurationSeconds * 1000;

    const elapsedMilliseconds =
        getElapsedMilliseconds(session, now);

    return Math.min(
        Math.max(
            elapsedMilliseconds /
            durationMilliseconds,
            0
        ),
        1
    );
}