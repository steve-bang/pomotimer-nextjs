"use client";

import { ClockProps } from "@/type";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  changeStatusCurrentSessionTime,
  countDownCurrentSessionTime,
} from "@/lib/pomodoroTimesSlice";
import { formatTime, getGreeting } from "@/lib/utils";
import CurrentSection from "./CurrentSection";
import { TIME_TO_RUN_COUNTDOWN_SECOND } from "@/constants/TimeProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Progress } from "./ui/progress";


export default function Clock({ status, type }: Readonly<ClockProps>) {
  const pomoTimeState = useAppSelector((state) => state.pomotimer);

  const pomoTimeDispatch = useAppDispatch();

  const [statusPomo, setStatusPomo] = useState(status);
  const [timeNow, setTimeNow] = useState<Date | null>(null);
  const [typeTime, setTypeTime] = useState(type);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRefCountdown = useRef<HTMLAudioElement | null>(null);
  const audioRefAlterCompleted = useRef<HTMLAudioElement | null>(null);
  const audioRefPomoStatusChange = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
  
    if (typeTime === "pomodoro-timer" && statusPomo === "in-progress") {
      const startTime = Date.now();
      const targetEndTime = startTime + pomoTimeState.currentSessionTime * 1000;
  
      intervalId = setInterval(() => {
        const remainingTime = Math.round((targetEndTime - Date.now()) / 1000);
        if (remainingTime > 0) {
          pomoTimeDispatch(countDownCurrentSessionTime());
        } else {
          audioRef.current?.play();
          pomoTimeDispatch(changeStatusCurrentSessionTime(
            pomoTimeState.status === "pomodoro" ? "break" : "pomodoro"
          ));
          clearInterval(intervalId);
        }
      }, 1000);
    }
  
    if (typeTime === "clock") {
      intervalId = setInterval(() => setTimeNow(new Date()), 1000);
    }
  
    return () => clearInterval(intervalId);
  }, [statusPomo, typeTime, pomoTimeState, pomoTimeDispatch]);

  function formatClock() {
    return `${timeNow?.getHours()} : ${timeNow?.getMinutes()}`;
  }

  function onChangeStatusPomo(status: "done" | "ready" | "in-progress" | "pause") {
    setStatusPomo(status);

    audioRefPomoStatusChange.current?.play();
  }

  return (
    <div className="clock p-4 flex flex-col items-center text-white">
      <div className="flex items-center gap-2 drop-shadow-2xl">
        <span className="time-text">
          {typeTime === "pomodoro-timer"
            ? formatTime(pomoTimeState.currentSessionTime)
            : formatClock()}
        </span>
      </div>

      {typeTime === "clock" ? (
        <h1>{getGreeting()}</h1>
      ) : (
        <>
          <div className="w-full border-1  border-white outline outline-1 h-4 dark:bg-gray-800 flex items-center rounded-full">
            {/* Display progress of the section */}
            {pomoTimeState.status === "pomodoro" ? (
              <Progress value={((pomoTimeState.totalSeconds - pomoTimeState.currentSessionTime) / pomoTimeState.totalSeconds) * 100} /> 
            )
            : (
              <Progress value={((pomoTimeState.totalSecondBreak - pomoTimeState.currentSessionTime) / pomoTimeState.totalSecondBreak) * 100} />
            )}
          </div>


          {/* Display current section */}
          <CurrentSection
            currentSection={pomoTimeState.currentSession}
            totalSection={pomoTimeState.totalSessions}
          />

          {/* Display button Play or Pause */}
          <div className="toolbar flex justify-center py-2 ">
            {typeTime === "pomodoro-timer" && (statusPomo === "ready" || statusPomo === "pause") ? (
              <Play
                className="cursor-pointer p-4 rounded-full shadow-2xl bg-rose-500 hover:bg-rose-400"
                size={50}
                onClick={() => onChangeStatusPomo("in-progress")}
              />
            ) : (
              <Pause
                className="cursor-pointer p-4 rounded-full shadow-2xl bg-slate-400"
                size={50}
                onClick={() => onChangeStatusPomo("pause")}
              />
            )}
          </div>
        </>
      )}

      {/* Declare audio for auto play */}

      <audio
        id="audio-pomo-close"
        ref={audioRef}
        src="/audio/alter-close-pomo.mp3"
        preload="auto"
      >
        <track kind="captions" />
      </audio>

      <audio
        id="audio-pomo-count-down"
        ref={audioRefCountdown}
        src="/audio/clock-ticking-second-countdown.mp3"
        preload="auto"
      >
        <track kind="captions" />
      </audio>

      <audio
        id="audio-pomo-completed"
        ref={audioRefAlterCompleted}
        src="/audio/alter-completed-section.m4a"
        preload="auto"
      >
        <track kind="captions" />
      </audio>

      <audio
        id="audio-pomo-status-change"
        ref={audioRefPomoStatusChange}
        src="/audio/pomo-status-change.mp3"
      >
        <track kind="captions" />
      </audio>

      <AlertDialog open={pomoTimeState.completed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete your section</AlertDialogTitle>
            <AlertDialogDescription>
              You have completed your section. Please take a break.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setTypeTime("clock")} >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
