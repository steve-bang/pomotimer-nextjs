import { usePomodoroContext } from "@/lib/PomodoroContext";


export default function StateTimer() {
    
    const { pomodoroData } = usePomodoroContext();

    // Get the status of the timer
    function getStatus() {
        switch (pomodoroData.status) {
            case 'pomodoro':
                return 'Focus time';
            case 'break':
                return 'Break time';
            default:
                return 'Start focus';
        }
    }

    return ( <p className="text-2xl text-white font-bold">
            {getStatus()}
    </p>);
}