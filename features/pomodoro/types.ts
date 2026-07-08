export type SessionStatus =
    | "running"
    | "paused"
    | "completed";

export type SessionType = "focus" | "shortBreak" | "longBreak";

export interface PomodoroTask {
    id: string;
    title: string;

    status: "pending" | "completed" | "cancelled";

    createdAt: Date;
    completedAt?: Date;
    cancelledAt?: Date;
}

export type PomodoroEvent =
    | {
        type: "started";
        timestamp: Date;
    }
    | {
        type: "pauseStarted";
        timestamp: Date;
    }
    | {
        type: "pauseEnded";
        timestamp: Date;
    }
    | {
        type: "completed";
        timestamp: Date;
    };

export interface PomodoroSession {
    id: string;

    type: SessionType;

    plannedDurationSeconds: number;

    tasks: PomodoroTask[];
    events: PomodoroEvent[];
}
