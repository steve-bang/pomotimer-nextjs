import { PomodoroTimeType } from "@/type";

export const POMODORO_TIME_DEFAULT : PomodoroTimeType[] = [
    {
        label: "25 minutes",
        focusTime: 25,
        breakTime: 5
    },
    {
        label: "45 minutes",
        focusTime: 45,
        breakTime: 10
    },
    {
        label: "60 minutes",
        focusTime: 60,
        breakTime: 15
    }
]