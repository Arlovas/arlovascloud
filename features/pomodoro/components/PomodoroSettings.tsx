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
import { useEffect, useState } from "react";

const SETTINGS_FORM_ID = "pomodoro-settings-form";

interface PomodoroSettingsProps {
    settings: PomodoroSettings;
    updateSettings: (settings: PomodoroSettings) => void;
    resetToDefault: () => void;
}

export default function PomodoroSettings({ settings, updateSettings, resetToDefault }: PomodoroSettingsProps) {
    const [open, setOpen] = useState(false);
    const [focusMinutes, setFocusMinutes] = useState(() =>
        String(settings.focusDurationSeconds / 60),
    );
    const [breakMinutes, setBreakMinutes] = useState(() =>
        String(settings.shortBreakDurationSeconds / 60),
    );

    useEffect(() => {
        if (!open) {
            return;
        }

        setFocusMinutes(String(settings.focusDurationSeconds / 60));
        setBreakMinutes(String(settings.shortBreakDurationSeconds / 60));
    }, [open, settings.focusDurationSeconds, settings.shortBreakDurationSeconds]);

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const focusDurationSeconds = parseFormMinutesToSeconds(
            focusMinutes,
            DEFAULT_FOCUS_DURATION_SECONDS,
        );
        const breakDurationSeconds = parseFormMinutesToSeconds(
            breakMinutes,
            DEFAULT_SHORT_BREAK_DURATION_SECONDS,
        );

        updateSettings({
            focusDurationSeconds,
            shortBreakDurationSeconds: breakDurationSeconds,
            longBreakDurationSeconds: 0,
        });
        setOpen(false);
    }


    function handleResetToDefault() {
        resetToDefault();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <button
                        type="button"
                        className="cursor-pointer z-10 flex items-center gap-2 px-10 py-3 rounded-full bg-gray-700/20 text-white font-semibold shadow-lg transition-all hover:bg-gray-700/30"
                    >

                        <span className="text-sm">Settings</span>
                    </button>
                }
            />

            <form id={SETTINGS_FORM_ID} onSubmit={handleSave}>
                <DialogContent className="sm:max-w-sm" finalFocus={false}>
                    <DialogHeader>
                        <DialogTitle>Configure Pomodoro</DialogTitle>
                        <DialogDescription>
                            Configure Pomodoro to suit your needs
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="focusTime">Focus time (minutes)</Label>
                            <Input
                                id="focusTime"
                                name="focusTime"
                                form={SETTINGS_FORM_ID}
                                value={focusMinutes}
                                onChange={(e) => setFocusMinutes(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="breakTime">Break time (minutes)</Label>
                            <Input
                                id="breakTime"
                                name="breakTime"
                                form={SETTINGS_FORM_ID}
                                value={breakMinutes}
                                onChange={(e) => setBreakMinutes(e.target.value)}
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <Button variant="destructive" onClick={handleResetToDefault}>Reset to default</Button>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="submit" form={SETTINGS_FORM_ID}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog >
    );
}
