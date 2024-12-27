import Setting from "./ui/Setting";
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
import { useState } from "react";

import { SelectItemProps } from "@/type";
import { useAppDispatch } from "@/lib/store";
import { setPomodoroTimes } from "@/lib/pomodoroTimesSlice";
import { convertMinutesToSeconds } from "@/lib/utils";

// Pomodoro types
const pomodoroTypes : SelectItemProps[] = [
    { value: "1", label: "1 minutes" },
    { value: "25", label: "25 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "50", label: "50 minutes" },
    { value: "60", label: "60 minutes" },
    { value: "90", label: "90 minutes" },
];



export default function NavbarMenu() {

    const [isOpen, setIsOpen] = useState(false);

    const [sessionNumber, setSessionSessionNumber] = useState(5);
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
                totalSessions: sessionNumber,
                currentSession: 0,
                currentSessionTime: convertMinutesToSeconds(parseInt(pomoTypeMinutes)),
        }));

        // Close the dialog
        setIsOpen(false);
    };


    return (
        <div className="flex justify-between py-4 px-8">
            <div className="text-white font-medium">Pomotimer</div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Setting /> Settings
                    </Button>
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
                            <Input type="number" id="session" className="w-[200px]" name="session" value={sessionNumber} onChange={(e) => setSessionSessionNumber(Number.parseInt(e.target.value))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={onClickSaveChange}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
