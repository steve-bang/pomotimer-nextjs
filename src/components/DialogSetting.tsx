

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
import { useAppDispatch } from "@/lib/store";
import { setPomodoroTimes } from "@/lib/pomodoroTimesSlice";
import { convertMinutesToSeconds } from "@/lib/utils";
import { SelectItemProps } from "@/type";
import { POMODORO_TIME_DEFAULT } from "@/constants/PomodoroTypeDefault";
import { Settings } from "lucide-react";

// Pomodoro types
const pomodoroTypes: SelectItemProps[] = POMODORO_TIME_DEFAULT.map(p => ({ value: p.focusTime, label: p.label }));

export function DialogSetting() {

    const [isOpen, setIsOpen] = useState(false);

    const [sessionNumber, setSessionNumber] = useState(5);

    const [pomoTypeMinutes, setPomoTypeMinutes] = useState(pomodoroTypes[0].value);

    const dispatch = useAppDispatch();

    // On select time from dropdown list.
    const onSelectTime = (currentValue: string) => {
        if (currentValue !== pomoTypeMinutes) {
            setPomoTypeMinutes(currentValue);
        }
    };

    // On click save change
    const onClickSaveChange = () => {
        // Set the pomodoro times to the store
        dispatch(setPomodoroTimes({
            totalSeconds: convertMinutesToSeconds(parseInt(pomoTypeMinutes)),
            totalSecondBreak: POMODORO_TIME_DEFAULT.find(x => x.focusTime === convertMinutesToSeconds(parseInt(pomoTypeMinutes)))?.breakTime,
            totalSessions: sessionNumber,
            currentSession: 0,
            currentSessionTime: convertMinutesToSeconds(parseInt(pomoTypeMinutes)),
            completed: false
        }));

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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Pomodoro
                        </Label>
                        <SelectPomotimerType
                            onSelectTime={onSelectTime}
                            values={pomodoroTypes}
                            defaultValue={pomoTypeMinutes}
                        />
                    </div>
                </div>

                <div className="grid gap-4 py-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
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