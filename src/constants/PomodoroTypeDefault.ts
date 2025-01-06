import { PomodoroTimeType } from "@/type";

export const POMODORO_TIME_DEFAULT : PomodoroTimeType[] = [
    {
        label: "25 minutes",
        focusTimeSeconds: 1500,
        breakTimeSeconds: 300
    },
    {
        label: "45 minutes",
        focusTimeSeconds: 2700,
        breakTimeSeconds: 600
    },
    {
        label: "60 minutes",
        focusTimeSeconds: 3600,
        breakTimeSeconds: 900
    }
]