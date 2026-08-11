import Pomodoro from "@/features/pomodoro/Pomodoro";

export default function Page() {
    return (
        <div className="flex h-[calc(100svh-4rem)] min-h-0 flex-col overflow-hidden">
            <Pomodoro />
        </div>
    );
}
