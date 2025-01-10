import { PomodoroTimeType } from "@/type";

export const POMODORO_TIME_DEFAULT : PomodoroTimeType[] = [
    {
        label: "one minutes",
        focusTimeSeconds: 1,
        breakTimeSeconds: 30
    },
    {
        label: "25 minutes",
        focusTimeSeconds: 25,
        breakTimeSeconds: 300
    },
    {
        label: "45 minutes",
        focusTimeSeconds: 45,
        breakTimeSeconds: 600
    },
    {
        label: "60 minutes",
        focusTimeSeconds: 60,
        breakTimeSeconds: 900
    }
]