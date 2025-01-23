

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import SelectPomotimerType from "./SelectPomotimerType";
import { Input } from "./ui/input";
import { SelectItemProps } from "@/type";
import { POMODORO_TIME_DEFAULT } from "@/constants/PomodoroTypeDefault";
import { Settings, ActivityIcon } from "lucide-react";
import { usePomodoroContext } from "@/lib/PomodoroContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Pomodoro types
const pomodoroTypes: SelectItemProps[] = POMODORO_TIME_DEFAULT.map(p => ({ value: p.focusTimeSeconds, label: p.label }));

const breakDurationTimes : number[] = [ 5, 10, 15, 20, 25, 30 ]

export function DialogSetting() {

    const [isOpen, setIsOpen] = useState(false);

    const [sessionNumber, setSessionNumber] = useState(5);

    const [focusDurationMinutes, setFocusDurationMinutes] = useState(parseInt(pomodoroTypes[0].value));

    const [breakDurationMinutes, setBreakDurationMinutes] = useState(breakDurationTimes[0]);

    const { initData } = usePomodoroContext();

    // On select time from dropdown list.
    const onSelectTime = (currentValue: number) => {
        if (currentValue !== focusDurationMinutes) {
            setFocusDurationMinutes(currentValue);
        }
    };

    // On click save change
    const onClickSaveChange = () => {
        // Set the pomodoro times to the store
        initData(
            focusDurationMinutes,
            breakDurationMinutes,
            sessionNumber
        );

        // Close the dialog
        setIsOpen(false);
    };

    function handleOnChangeSessionNumber(e: React.ChangeEvent<HTMLInputElement>) {

        if (Number.parseInt(e.target.value) < 1) {
            setSessionNumber(1);
            return;
        }

        setSessionNumber(Number.parseInt(e.target.value));
    }

    return (<div className="tools-nav-bar">

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <span className="setting cursor-pointer text-white" title="Settings">   
                    <Settings />
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Setting</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="name" className="text-left">
                            Pomodoro
                        </Label>
                        <SelectPomotimerType
                            onSelectTime={onSelectTime}
                            values={pomodoroTypes}
                            defaultValue={focusDurationMinutes}
                        />
                    </div>
                </div>

                <div className="grid gap-4 py-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="name" className="text-left">
                            Break
                        </Label>
                        <Select onValueChange={(valueChange) => setBreakDurationMinutes(parseInt(valueChange))} defaultValue={breakDurationMinutes.toString()}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select time..."></SelectValue>
                            </SelectTrigger>
                            <SelectContent>

                                {breakDurationTimes.map((pomodoroType) => (
                                    <SelectItem
                                        key={pomodoroType}
                                        value={pomodoroType.toString()}
                                    >
                                        {pomodoroType} Minutes
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-4 py-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="name" className="text-">
                            Session
                        </Label>
                        <Input type="number" id="session" className="w-[200px]" name="session" value={sessionNumber} onChange={(e) => handleOnChangeSessionNumber(e)} />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit" onClick={onClickSaveChange}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>)
}