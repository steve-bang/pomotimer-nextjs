
import { POMODORO_TIME_DEFAULT } from "@/constants/PomodoroTypeDefault";
import { IPomodoroTime } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: IPomodoroTime = {
    totalSession: 1500,
    breakDurationMinutes: 0,
    focusDurationMinutes: 5,
    currentSession: 1,
    currentTimeSecondRunning: 1500,
    status: 'pomodoro',
    completed: false,
    totalTimeSecondRunning: 0
};

export const pomodoroTimesSlice = createSlice({
    name: 'pomodoroTimes',
    initialState,
    reducers: {
        setPomodoroTimes: (state : IPomodoroTime , action: PayloadAction<IPomodoroTime>) => {
            state.totalSession = action.payload.totalSession;
            state.focusDurationMinutes = action.payload.focusDurationMinutes;
            state.currentSession = action.payload.currentSession;
            state.currentTimeSecondRunning = action.payload.currentTimeSecondRunning;
            state.breakDurationMinutes = action.payload.breakDurationMinutes;
        },
        countDownCurrentSessionTime: (state : IPomodoroTime) => {
            state.currentTimeSecondRunning -= 1;
        },
        setCurrentSessionTimeEnd: (state : IPomodoroTime, action: PayloadAction<number>) => {
            state.currentTimeSecondRunning = action.payload;
        },
        changeStatusCurrentSessionTime: (state : IPomodoroTime, action: PayloadAction<'break' | 'pomodoro'>) => {
            
            // Pomodoro -> Break
            if(action.payload === 'break'){
                state.currentTimeSecondRunning = POMODORO_TIME_DEFAULT.find(x => x.focusTimeSeconds === state.totalSession)?.breakTimeSeconds;
            }
            // Break -> Pomodoro
            else {
                
                // If the current session equal total session, set the completed is true.
                if(state.currentSession == state.focusDurationMinutes)
                    state.completed = true;

                state.currentSession += 1;
                state.currentTimeSecondRunning = POMODORO_TIME_DEFAULT.find(x => x.focusTimeSeconds === state.totalSession)?.focusTimeSeconds;
            }
                
            state.status = action.payload;
        },
    },
});

export const { setPomodoroTimes , countDownCurrentSessionTime, changeStatusCurrentSessionTime, setCurrentSessionTimeEnd } = pomodoroTimesSlice.actions;
export const pomodoroTimesReducer = pomodoroTimesSlice.reducer;