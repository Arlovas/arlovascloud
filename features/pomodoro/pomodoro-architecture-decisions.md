# Pomodoro Feature Architecture Decisions

## Purpose

Build a scalable, maintainable Pomodoro feature for a Next.js
application while keeping business logic independent from the UI.

## Architectural Principles

-   Design the domain model before React hooks.
-   Keep business logic separate from rendering.
-   Prefer a single source of truth.
-   Derive computed values instead of storing duplicated state.
-   Introduce complexity only when it becomes necessary.

## Project Structure

    app/
    └── pomodoro/
        └── page.tsx

    features/
    └── pomodoro/
        ├── Pomodoro.tsx
        ├── types.ts
        ├── calculations.ts
        └── usePomodoro.ts

    components/
    └── ui/

### Responsibilities

-   `app/`: routing and page composition.
-   `features/pomodoro/`: owns everything related to the Pomodoro
    feature.
-   `components/ui/`: reusable UI components with no Pomodoro knowledge.

## Client Boundary

-   `app/pomodoro/page.tsx` remains a Server Component.
-   `features/pomodoro/Pomodoro.tsx` is the client entry point
    (`"use client"`).

## State Ownership

-   `Pomodoro.tsx` owns the feature state through `usePomodoro()`.
-   The page itself owns no business state.

## Persistence

Current session: - Lives only in memory. - Lost on refresh or browser
close.

History: - Persisted in `localStorage`. - Only completed sessions are
stored.

## Session Model

A session represents any timed block: - Focus - Short break - Long break

The application does not enforce a Pomodoro cycle. The user chooses
which session type to start next.

## Timer

-   Timestamp-based.
-   UI refreshes once per second.
-   The interval only triggers recalculation; it is not the source of
    time.

## Tasks

-   Belong to the active session.
-   Can be added during an active session.
-   Can be completed.
-   Can be cancelled (kept in history).
-   Can be deleted (removed completely).

## Events

The event list is the historical source of truth.

Events:

-   started
-   pauseStarted
-   pauseEnded
-   completed

Multiple pause/resume cycles are supported.

## Derived Values

Calculated instead of stored:

-   status
-   remaining time
-   elapsed time
-   paused duration
-   progress

These calculations belong in `calculations.ts`.

## Public Hook Philosophy

The hook should expose user intentions:

-   start()
-   pause()
-   resume()
-   complete()
-   skip()
-   addTask()
-   completeTask()
-   cancelTask()
-   deleteTask()

The UI should never manipulate events directly.

## Domain Types

-   SessionType
-   PomodoroSession
-   PomodoroEvent
-   PomodoroTask

Implementation decisions:

-   IDs are plain strings.
-   Dates are represented as `Date`.
-   `plannedDurationSeconds` explicitly includes the unit.
