import { configureStore } from '@reduxjs/toolkit'
import { pomodoroTimesReducer } from './pomodoroTimesSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
      reducer: {
        pomotimer : pomodoroTimesReducer
      }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
