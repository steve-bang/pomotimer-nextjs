

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectItemProps } from "@/type";

export interface SelectPomotimerTypeProps {
    onSelectTime: (value: string) => void;
    values: SelectItemProps[];
    defaultValue: string;
}

export default function SelectPomotimerType(
    { onSelectTime, values, defaultValue } : SelectPomotimerTypeProps
) {
    console.log(defaultValue);
    return (<Select onValueChange={(valueChange) => onSelectTime(valueChange)} defaultValue={defaultValue}>
        <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select time..."></SelectValue>
        </SelectTrigger>
        <SelectContent>

            {values.map((pomodoroType) => (
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