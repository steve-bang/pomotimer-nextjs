import { useAppSelector } from "@/lib/store";

export default function StateTimer() {
    
    const pomoTimeState = useAppSelector((state) => state.pomotimer);

    // Get the status of the timer
    function getStatus() {
        switch (pomoTimeState.status) {
            case 'pomodoro':
                return 'Focus time';
            default:
                return 'Break time';
        }
    }

    return ( <p className="text-2xl text-white font-bold">
            {getStatus()}
    </p>);
}