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
    currentSessionTime: 0,
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
    },
});

export const { setPomodoroTimes } = pomodoroTimesSlice.actions;
export const pomodoroTimesReducer = pomodoroTimesSlice.reducer;