

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
import { Input } from "./ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setPomodoroTimes } from "@/lib/pomodoroTimesSlice";
import { Settings } from "lucide-react";



export function StateSetting() {

    const [isOpen, setIsOpen] = useState(false);
    const pomoTimeState = useAppSelector((state) => state.pomotimer);
    const [currentSessionTime, setCurrentSessionTime] = useState(1)

    const dispatch = useAppDispatch();


    // On click save change
    const onClickSaveChange = () => {
        // Set the pomodoro times to the store
        dispatch(setPomodoroTimes({
            totalSeconds: pomoTimeState.totalSeconds,
            totalSecondBreak: pomoTimeState.totalSecondBreak,
            totalSessions: pomoTimeState.totalSessions,
            currentSession: 1,
            currentSessionTime: currentSessionTime,
            completed: false
        }));

        // Close the dialog
        setIsOpen(false);
    };

    function handleOnChangeSessionNumber(e: React.ChangeEvent<HTMLInputElement>) {

        if (Number.parseInt(e.target.value) < 1) {
            setCurrentSessionTime(1);
            return;
        }

        setCurrentSessionTime(Number.parseInt(e.target.value));
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
                            Total Current Time
                        </Label>
                        <Input type="number" id="session" className="w-[200px]" name="session" value={currentSessionTime} onChange={(e) => handleOnChangeSessionNumber(e)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onClickSaveChange}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>)
}