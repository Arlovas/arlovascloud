export default function PomodoroTask() {
    return (
        <div className="w-full max-w-2xl flex-4">
            <div className="w-full max-w-2xl rounded-3xl shadow-2xl backdrop-blur-xl bg-zinc-800/20  p-10">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Today&apos;s Focus
                    </h2>

                    <button className="text-zinc-500 hover:text-zinc-300">•••</button>
                </div>

                <div className="space-y-5">
                    <label className="flex items-center gap-4 text-zinc-400">
                        <div className="h-5 w-5 rounded border border-zinc-600" />
                        <span>Build landing page hero section</span>
                    </label>

                    <label className="flex items-center gap-4 text-zinc-300">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-red-500 text-xs text-white">
                            ✓
                        </div>
                        <span>Fix mobile layout issues</span>
                    </label>

                    <label className="flex items-center gap-4 text-zinc-500">
                        <div className="h-5 w-5 rounded border border-zinc-700" />
                        <span>Write blog post about productivity</span>
                    </label>
                </div>

                <button className="mt-8 flex items-center gap-3 text-zinc-500 transition hover:text-zinc-300">
                    <span className="text-3xl leading-none">+</span>
                    <span>Add a task</span>
                </button>
            </div>
        </div>
    )
}