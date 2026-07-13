/**
 * Web Worker for reliable background timer completion.
 *
 * Why: Browsers throttle setInterval/setTimeout in background tabs to ~1/min.
 * Workers run in their own thread and are NOT subject to this throttling,
 * so the timeout fires on time even when the tab is hidden.
 *
 * Protocol:
 *   Main thread → Worker:  { type: "start", remainingMs: number }
 *   Main thread → Worker:  { type: "cancel" }
 *   Worker → Main thread:  { type: "completed" }
 */

let timeoutId: ReturnType<typeof setTimeout> | null = null;

self.onmessage = (e: MessageEvent) => {
    const { type, remainingMs } = e.data;

    if (type === "start") {
        // Clear any existing timer before starting a new one
        if (timeoutId) {
            clearTimeout(timeoutId);
            console.log("[Worker] Cleared previous timer");
        }

        console.log(`[Worker] Starting timer for ${remainingMs}ms (${(remainingMs / 1000).toFixed(1)}s)`);

        timeoutId = setTimeout(() => {
            console.log("[Worker] Timer completed! Posting message to main thread.");
            self.postMessage({ type: "completed" });
            timeoutId = null;
        }, remainingMs);
    }

    if (type === "cancel") {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
            console.log("[Worker] Timer cancelled");
        }
    }
};
