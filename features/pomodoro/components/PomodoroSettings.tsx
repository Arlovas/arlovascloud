import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    DEFAULT_FOCUS_DURATION_SECONDS,
    DEFAULT_SHORT_BREAK_DURATION_SECONDS,
    parseFormMinutesToSeconds,
} from "../constants";
import type { PomodoroSettings } from "../types";
import { useState } from "react";

interface PomodoroSettingsProps {
    settings: PomodoroSettings;
    updateSettings: (settings: PomodoroSettings) => void;
}

export default function PomodoroSettings({ settings, updateSettings }: PomodoroSettingsProps) {
    const [open, setOpen] = useState(false);

    const focusDurationMinutes = settings.focusDurationSeconds / 60;
    const breakDurationMinutes = settings.shortBreakDurationSeconds / 60;
    const formKey = `${settings.focusDurationSeconds}-${settings.shortBreakDurationSeconds}`;

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const focusDurationSeconds = parseFormMinutesToSeconds(
            formData.get("focusTime"),
            DEFAULT_FOCUS_DURATION_SECONDS,
        );
        const breakDurationSeconds = parseFormMinutesToSeconds(
            formData.get("breakTime"),
            DEFAULT_SHORT_BREAK_DURATION_SECONDS,
        );

        updateSettings({
            focusDurationSeconds,
            shortBreakDurationSeconds: breakDurationSeconds,
            longBreakDurationSeconds: 0,
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <button
                        className="cursor-pointer z-10 flex items-center gap-2 px-10 py-3 rounded-full bg-gray-700/20 text-white font-semibold shadow-lg transition-all hover:bg-gray-700/30"
                    >

                        <span className="text-sm">Settings</span>
                    </button>
                }
            />

            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSave} key={formKey}>
                    <DialogHeader>
                        <DialogTitle>Configure Pomodoro</DialogTitle>
                        <DialogDescription>
                            Configure Pomodoro to suit your needs
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="focusTime">Focus time (minutes)</Label>
                            <Input id="focusTime" name="focusTime" defaultValue={focusDurationMinutes} />
                        </Field>
                        <Field>
                            <Label htmlFor="breakTime">Break time (minutes)</Label>
                            <Input id="breakTime" name="breakTime" defaultValue={breakDurationMinutes} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="submit" >Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}