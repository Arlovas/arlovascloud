import { PomodoroEvent, PomodoroSession, SessionStatus } from "./types";

export function getLastEvent(
    session: PomodoroSession | null
): PomodoroEvent | null {
    if (!session) {
        return null;
    }

    if (session.events.length === 0) {
        throw new Error("Invalid session: no events found.");
    }

    return session.events[session.events.length - 1];
}

export function getStatus(
    session: PomodoroSession | null
): SessionStatus | null {
    const lastEvent = getLastEvent(session);

    if (!lastEvent) {
        return null;
    }

    switch (lastEvent.type) {
        case "started":
        case "pauseEnded":
            return "running";

        case "pauseStarted":
            return "paused";

        case "completed":
            return "completed";
    }
}

export function getStartedAt(
    session: PomodoroSession | null
): Date | null {
    if (!session) {
        return null;
    }

    const event = session.events[0];

    if (event.type !== "started") {
        throw new Error("Invalid session: first event must be 'started'.");
    }

    return event.timestamp;
}

export function getCompletedAt(
    session: PomodoroSession | null
): Date | null {
    if (!session) {
        return null;
    }

    const completedEvent = session.events.find(
        (event) => event.type === "completed"
    );

    return completedEvent?.timestamp ?? null;
}

export function getElapsedSeconds(
    session: PomodoroSession | null,
    now: Date = new Date()
): number {

    if (!session) {
        return 0;
    }

    let elapsed = 0;

    let runningStartedAt: Date | null = null;


    for (const event of session.events) {

        switch (event.type) {

            case "started":
            case "pauseEnded":
                runningStartedAt = event.timestamp;
                break;


            case "pauseStarted":

                if (runningStartedAt) {
                    elapsed += differenceInSeconds(
                        runningStartedAt,
                        event.timestamp
                    );

                    runningStartedAt = null;
                }

                break;


            case "completed":

                if (runningStartedAt) {
                    elapsed += differenceInSeconds(
                        runningStartedAt,
                        event.timestamp
                    );
                }

                runningStartedAt = null;
                break;
        }
    }


    // still running
    if (runningStartedAt) {
        elapsed += differenceInSeconds(
            runningStartedAt,
            now
        );
    }


    return elapsed;
}

function differenceInSeconds(
    start: Date,
    end: Date
) {
    return Math.floor(
        (end.getTime() - start.getTime()) / 1000
    );
}

export function getRemainingSeconds(
    session: PomodoroSession | null,
    now: Date = new Date()
): number {

    if (!session) {
        return 0;
    }


    const elapsed = Math.max(
        0,
        getElapsedSeconds(
            session,
            now
        )
    );

    return Math.max(
        0,
        session.plannedDurationSeconds - elapsed
    );
}

export function getProgress(
    session: PomodoroSession | null,
    now: Date = new Date()
): number {

    if (!session) {
        return 0;
    }


    const elapsed = getElapsedSeconds(
        session,
        now
    );


    return Math.min(
        1,
        elapsed / session.plannedDurationSeconds
    );
}