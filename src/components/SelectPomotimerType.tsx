
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectItemProps } from "@/type";
import { useAppDispatch } from "@/lib/store";
import { setPomodoroTimes } from "@/lib/pomodoroTimesSlice";
import { convertMinutesToSeconds } from "@/lib/utils";

const pomodoroTypes : SelectItemProps[] = [
    { value: "1", label: "one minute" },
    { value: "25", label: "25 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "50", label: "50 minutes" },
    { value: "60", label: "60 minutes" },
    { value: "90", label: "90 minutes" },
];

export default function SelectPomotimerType() {

    const [value, setValue] = useState(pomodoroTypes[0].value);

    const dispatch = useAppDispatch();

    // On select time from dropdown list.
    const onSelectTime = (currentValue: string) => {
        if (currentValue !== value) {
            setValue(currentValue);
        }
        dispatch(setPomodoroTimes(
            {
                totalSeconds: convertMinutesToSeconds(parseInt(currentValue)),
                totalSessions: 10,
                currentSession: 0,
                currentSessionTime: 0,
            }
        ))
    };

    return (<Select onValueChange={(valueChange) => onSelectTime(valueChange)} defaultValue={value}>
        <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select time..."></SelectValue>
        </SelectTrigger>
        <SelectContent>

            {pomodoroTypes.map((pomodoroType) => (
                <SelectItem
                    key={pomodoroType.value}
                    value={pomodoroType.value.toString()}
                >
                    {pomodoroType.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>);
};