import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLayoutEffect, useRef, useState } from "react";

export default function PomodoroTask() {
    const [tasks, setTasks] = useState<string[]>([]);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (tasks.length === 0) {
            return;
        }

        const viewport = scrollAreaRef.current?.querySelector(
            '[data-slot="scroll-area-viewport"]',
        );
        const lastField = scrollAreaRef.current?.querySelector(
            '[data-slot="field"]:last-of-type',
        );
        if (!(viewport instanceof HTMLElement) || !(lastField instanceof HTMLElement)) {
            return;
        }

        if (viewport.scrollHeight <= viewport.clientHeight) {
            return;
        }

        lastField.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, [tasks.length]);

    function handleAddTask(task: string) {
        const trimmed = task.trim();
        if (!trimmed) {
            return;
        }
        setTasks((prev) => [...prev, trimmed]);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        handleAddTask(form.task.value);
        form.task.value = "";
    }

    return (
        <div className="flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 pb-6">
            <div className="flex max-h-full w-full flex-col overflow-hidden rounded-3xl bg-zinc-800/20 p-10 shadow-2xl backdrop-blur-xl">
                <div className="mb-6 flex shrink-0 items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Today&apos;s Focus
                    </h2>

                    <button type="button" className="text-zinc-500 hover:text-zinc-300">•••</button>
                </div>

                <div ref={scrollAreaRef} className="min-h-0 flex-1">
                    <ScrollArea
                        className="size-full [&_[data-slot=scroll-area-scrollbar]]:border-l-0 [&_[data-slot=scroll-area-scrollbar]]:bg-transparent [&_[data-slot=scroll-area-thumb]]:bg-zinc-600 hover:[&_[data-slot=scroll-area-thumb]]:bg-zinc-500"
                    >
                        <FieldGroup className="pr-3">
                            {tasks.map((task, index) => (
                                <Field key={index} orientation="horizontal">
                                    <Checkbox id={`task-${index}`} name={`task-${index}`} />
                                    <FieldLabel htmlFor={`task-${index}`}>
                                        {task}
                                    </FieldLabel>
                                </Field>
                            ))}
                        </FieldGroup>
                    </ScrollArea>
                </div>

                <div className="mt-8 flex shrink-0 items-center gap-3 text-zinc-500 transition hover:text-zinc-300">
                    <span className="text-3xl leading-none">+</span>
                    <form onSubmit={handleSubmit} className="w-full">
                        <Input className="bg-transparent border-none w-full" placeholder="New task" name="task" />
                    </form>
                </div>
            </div>
        </div>
    );
}
