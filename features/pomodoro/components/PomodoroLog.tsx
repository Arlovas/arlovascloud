export default function PomodoroLog() {
    return (
        <div className="w-full max-w-md overflow-hidden rounded-3xl bg-zinc-800/20 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between  px-7 py-5">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                    Pomodoro Log
                </h2>

                {/* <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-500">
                    📈
                </button> */}
            </div>

            <div className="px-7">
                <PomodoroItem
                    icon="🍅"
                    title="Pomodoro 4"
                    subtitle="Deep work"
                    duration="25:00"
                />

                <PomodoroItem
                    icon="🌙"
                    title="Short Break"
                    subtitle="Rest"
                    duration="05:00"
                />

                <PomodoroItem
                    icon="🍅"
                    title="Pomodoro 3"
                    subtitle="Deep work"
                    duration="25:00"
                />

                <PomodoroItem
                    icon="🌙"
                    title="Short Break"
                    subtitle="Rest"
                    duration="05:00"
                />

                <PomodoroItem
                    icon="🍅"
                    title="Pomodoro 2"
                    subtitle="Deep work"
                    duration="25:00"
                />

                <PomodoroItem
                    icon="🌙"
                    title="Short Break"
                    subtitle="Rest"
                    duration="05:00"
                />

                <PomodoroItem
                    icon="🍅"
                    title="Pomodoro 1"
                    subtitle="Deep work"
                    duration="25:00"
                    last
                />

                <div className="flex items-center gap-3 py-5 text-sm text-zinc-500">
                    <span>Yesterday</span>
                    <div className="h-px flex-1 bg-white/5" />
                </div>

                <PomodoroItem
                    icon="🍅"
                    title="Pomodoro 6"
                    subtitle="Deep work"
                    duration="25:00"
                />
            </div>
        </div>
    );
}

interface PomodoroItemProps {
    icon: string;
    title: string;
    subtitle: string;
    duration: string;
    last?: boolean;
}

function PomodoroItem({
    icon,
    title,
    subtitle,
    duration,
    last,
}: PomodoroItemProps) {
    return (
        <div
            className={`flex items-center gap-4 py-4 ${!last && "border-b border-white/5"
                }`}
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-full text-xl">
                {icon}
            </div>

            <div className="flex-1">
                <p className="text-lg text-zinc-100">{title}</p>
                <p className="text-sm text-zinc-500">{subtitle}</p>
            </div>

            <div className="flex items-center gap-5">
                <span className="text-zinc-400">{duration}</span>
                <span className="text-red-500">✓</span>
            </div>
        </div>
    );
}