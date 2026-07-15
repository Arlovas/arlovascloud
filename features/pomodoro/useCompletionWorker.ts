/**
 * Hook that delegates timer completion to a Web Worker.
 *
 * The worker runs in its own thread, immune to background-tab throttling.
 * When `remainingMs` is a positive number, the worker schedules a timeout.
 * When it fires, `onComplete` is called on the main thread.
 *
 * Pass `null` to cancel/disable the timer (e.g., when paused or completed).
 */

"use client";

import { useEffect, useRef } from "react";

export function useCompletionWorker(
    remainingMs: number | null,
    onComplete: () => void
) {
    const workerRef = useRef<Worker | null>(null);
    const onCompleteRef = useRef(onComplete);

    // Keep the callback ref fresh without restarting the worker
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    // Create and terminate the worker with the component lifecycle
    useEffect(() => {
        // console.log("[useCompletionWorker] Creating Web Worker");

        workerRef.current = new Worker(
            new URL("./timer.worker.ts", import.meta.url)
        );

        workerRef.current.onmessage = (e: MessageEvent) => {
            if (e.data.type === "completed") {
                // console.log("[useCompletionWorker] Received 'completed' from worker");
                onCompleteRef.current();
            }
        };

        workerRef.current.onerror = (err) => {
            console.error("[useCompletionWorker] Worker error:", err);
        };

        return () => {
            // console.log("[useCompletionWorker] Terminating Web Worker");
            workerRef.current?.terminate();
            workerRef.current = null;
        };
    }, []);

    // Send start/cancel messages whenever remainingMs changes
    useEffect(() => {
        if (!workerRef.current) return;

        if (remainingMs !== null && remainingMs > 0) {
            // console.log(`[useCompletionWorker] Sending 'start' to worker — ${remainingMs}ms remaining`);
            workerRef.current.postMessage({ type: "start", remainingMs });
        } else {
            // console.log("[useCompletionWorker] Sending 'cancel' to worker");
            workerRef.current.postMessage({ type: "cancel" });
        }
    }, [remainingMs]);
}
