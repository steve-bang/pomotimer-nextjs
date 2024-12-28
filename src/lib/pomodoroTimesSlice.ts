import { POMODORO_TIME_DEFAULT } from "@/constants/PomodoroTypeDefault";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPomodoroTime{
    totalSeconds: number;
    totalSecondBreak: number;
    totalSessions: number;
    currentSession: number;
    currentSessionTime: number;
    status?: 'break' | 'pomodoro';
    completed : boolean
}

const initialState: IPomodoroTime = {
    totalSeconds: 1500,
    totalSecondBreak: 0,
    totalSessions: 5,
    currentSession: 1,
    currentSessionTime: 1500,
    status: 'pomodoro',
    completed: false
};

export const pomodoroTimesSlice = createSlice({
    name: 'pomodoroTimes',
    initialState,
    reducers: {
        setPomodoroTimes: (state : IPomodoroTime , action: PayloadAction<IPomodoroTime>) => {
            state.totalSeconds = action.payload.totalSeconds;
            state.totalSessions = action.payload.totalSessions;
            state.currentSession = action.payload.currentSession;
            state.currentSessionTime = action.payload.currentSessionTime;
            state.totalSecondBreak = action.payload.totalSecondBreak;
        },
        countDownCurrentSessionTime: (state : IPomodoroTime) => {
            state.currentSessionTime -= 1;
        },
        changeStatusCurrentSessionTime: (state : IPomodoroTime, action: PayloadAction<'break' | 'pomodoro'>) => {
            
            // Pomodoro -> Break
            if(action.payload === 'break'){
                state.currentSessionTime = POMODORO_TIME_DEFAULT.find(x => x.focusTime === state.totalSeconds)?.breakTime;
            }
            // Break -> Pomodoro
            else {
                
                // If the current session equal total session, set the completed is true.
                if(state.currentSession == state.totalSessions)
                    state.completed = true;

                state.currentSession += 1;
                state.currentSessionTime = POMODORO_TIME_DEFAULT.find(x => x.focusTime === state.totalSeconds)?.focusTime;
            }
                
            state.status = action.payload;
        },
    },
});

export const { setPomodoroTimes , countDownCurrentSessionTime, changeStatusCurrentSessionTime } = pomodoroTimesSlice.actions;
export const pomodoroTimesReducer = pomodoroTimesSlice.reducer;