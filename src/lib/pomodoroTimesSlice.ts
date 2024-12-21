import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPomodoroTime{
    totalSeconds: number;
    totalSessions: number;
    currentSession: number;
    currentSessionTime: number;
    status?: 'break' | 'pomodoro';
}

const initialState: IPomodoroTime = {
    totalSeconds: 1500,
    totalSessions: 5,
    currentSession: 1,
    currentSessionTime: 1500,
    status: 'pomodoro',
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
        },
        countDownCurrentSessionTime: (state : IPomodoroTime) => {
            state.currentSessionTime -= 1;
        },
        changeStatusCurrentSessionTime: (state : IPomodoroTime, action: PayloadAction<'break' | 'pomodoro'>) => {
            state.status = action.payload;
        },
    },
});

export const { setPomodoroTimes , countDownCurrentSessionTime, changeStatusCurrentSessionTime } = pomodoroTimesSlice.actions;
export const pomodoroTimesReducer = pomodoroTimesSlice.reducer;