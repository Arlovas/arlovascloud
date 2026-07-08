export function formatDuration(seconds: number): string {

    // TODO: this is just a hardcode to make appear 25:00 after a refresh
    if (seconds === 0) {
        seconds = 25 * 60;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    

    return `${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
}