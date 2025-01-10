import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { IPomodoroTime, PomodoroStatus } from "@/type";
import { convertMinutesToSeconds } from "./utils";

// Define the props for the provider component
interface PomodoroProviderProps {
    children: ReactNode;
}

// Create the context
const PomodoroContext = createContext<{
    pomodoroData: IPomodoroTime;
    initData: (focusDurationMinutes: number, breakDurationMinutes: number, totalSection: number) => void;
    updateData: (newData: IPomodoroTime) => void;
    reset: () => void;
    setCurrentSessionTime: (currentSessionTime: number) => void;
    changeStatusCurrentSessionTime: (status: PomodoroStatus) => void;
} | undefined>(undefined);

// Custom hook to use the PomodoroContext
export const usePomodoroContext = (): {
    pomodoroData: IPomodoroTime;
    initData: (focusDurationMinutes: number, breakDurationMinutes: number, totalSection: number) => void;
    updateData: (newData: IPomodoroTime) => void;
    reset: () => void;
    setCurrentSessionTime: (currentSessionTime: number) => void;
    changeStatusCurrentSessionTime: (status: PomodoroStatus) => void;
} => {
    const context = useContext(PomodoroContext);
    if (!context) {
        throw new Error('usePomodoroContext must be used within a PomodoroProvider');
    }
    return context;
};

const pomodoroDefault: IPomodoroTime = {
    focusDurationMinutes: 25,
    breakDurationMinutes: 5,
    currentSession: 1,
    totalSession: 5,
    completed: false,
    status: 'ready',
    currentTimeSecondRunning: 25 * 60,
    totalTimeSecondRunning: 25 * 60
}

// Provider component
export const PomodoroProvider = ({ children }: PomodoroProviderProps) => {
    const [pomodoroData, setPomodoroData] = useState<IPomodoroTime>(pomodoroDefault);

    const initData = (focusDurationMinutes: number, breakDurationMinutes: number, totalSection: number) => {
        setPomodoroData({
            ...pomodoroData,
            focusDurationMinutes: focusDurationMinutes,
            breakDurationMinutes: breakDurationMinutes,
            totalSession: totalSection,
            currentTimeSecondRunning: convertMinutesToSeconds(focusDurationMinutes), 
            totalTimeSecondRunning: convertMinutesToSeconds(focusDurationMinutes),
        });
    };

    // Function to initialize pomodoroData
    const updateData = (newData: IPomodoroTime) => {
        setPomodoroData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };

    const reset = () => {
        setPomodoroData(pomodoroDefault);
    };

    const setCurrentSecondRunning = (currentSessionTime: number) => {
        if (pomodoroData) {
            setPomodoroData({ ...pomodoroData, currentTimeSecondRunning: currentSessionTime });
        }
    }

    const setTotalSecondRunning = (totalSessionTime: number) => {
        if (pomodoroData) {
            setPomodoroData({ ...pomodoroData, totalTimeSecondRunning: totalSessionTime });
        }
    }

    const markCompleted = () => {
        if (pomodoroData) {
            setPomodoroData({ ...pomodoroData, completed: true });
        }
    }

    const changeStatusCurrentSessionTime = (status: 'ready' | 'break' | 'pomodoro') => {
        let totalCurrentRunning = 0;

        if (status === 'break') {
            totalCurrentRunning = convertMinutesToSeconds(pomodoroData.breakDurationMinutes);
            setPomodoroData({
                ...pomodoroData, 
                status: status, 
                currentTimeSecondRunning: totalCurrentRunning, 
                totalTimeSecondRunning: totalCurrentRunning
            });
        } else if (status === 'pomodoro') {

            if(pomodoroData.status === 'ready') // Ready -> Pomodoro
            {
                setPomodoroData({
                    ...pomodoroData, 
                    status: status
                });
            }
            else // Break -> Pomodoro
            {
                // Not yet complete session
                if(pomodoroData.currentSession < pomodoroData.totalSession){
                    totalCurrentRunning = convertMinutesToSeconds(pomodoroData.focusDurationMinutes);
                    setPomodoroData({
                        ...pomodoroData, 
                        status: status,
                        totalTimeSecondRunning: totalCurrentRunning, 
                        currentTimeSecondRunning: totalCurrentRunning, 
                        currentSession: pomodoroData.currentSession + 1,
                    });
                }
                else {
                    markCompleted();
                }
            }


        }
    };

    const contextValue = useMemo(
        () => ({
            pomodoroData, 
            initData, 
            updateData, 
            reset, 
            setCurrentSessionTime: setCurrentSecondRunning, 
            setTotalSecondRunning, // Include this if necessary
            changeStatusCurrentSessionTime
        }),
        [pomodoroData]
    );

    return (
        <PomodoroContext.Provider value={contextValue}>
            {children}
        </PomodoroContext.Provider>
    );
};
