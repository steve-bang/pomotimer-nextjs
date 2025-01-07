"use client";

import { ClockProps } from "@/type";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  changeStatusCurrentSessionTime,
  setCurrentSessionTimeEnd,
} from "@/lib/pomodoroTimesSlice";
import { formatTime } from "@/lib/utils";
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

  const [typeTime, setTypeTime] = useState(type);
  const endTime = Date.now() + pomoTimeState.currentSessionTime * 1000;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRefCountdown = useRef<HTMLAudioElement | null>(null);
  const audioRefAlterCompleted = useRef<HTMLAudioElement | null>(null);
  const audioRefPomoStatusChange = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {

    // If the pomotime is complete
    if (pomoTimeState.completed) {
      audioRefAlterCompleted.current?.play();
      return;
    }

    // If the timer is in progress, the current session time is greater than 0, and the status is pomodoro
    if (
      typeTime === "pomodoro-timer" &&
      statusPomo === "in-progress" &&
      pomoTimeState.currentSessionTime >= 0
    ) {
      // Play audio repeatedly when currentSessionTime is less than 10 seconds
      if (
        pomoTimeState.currentSessionTime < TIME_TO_RUN_COUNTDOWN_SECOND &&
        pomoTimeState.currentSessionTime > 0
      ) {
        audioRefCountdown.current?.play();
      }

      // If currentSessionTime is 0, stop the audio and update session status
      if (
        pomoTimeState.currentSessionTime <= 0 &&
        statusPomo === "in-progress"
      ) {
        audioRef.current?.play();
        audioRefCountdown.current?.pause();

        if (pomoTimeState.status === "pomodoro") {
          pomoTimeDispatch(changeStatusCurrentSessionTime("break"));
          return;
        } else {
          pomoTimeDispatch(changeStatusCurrentSessionTime("pomodoro"));
          return;
        }
      }

      // Update the current session time every second
      const intervalId = setInterval(() => {

        const timeLeft = Math.max(0, Math.round(
          (endTime - Date.now()) / 1000)
        ); // Calculate remaining time

        pomoTimeDispatch(setCurrentSessionTimeEnd(timeLeft));

        if (timeLeft <= 0) clearInterval(intervalId); // Stop when time is up
      }, 1000); // Updates every 1 second

      // Cleanup the interval when the component unmounts or time reaches 0
      return () => clearInterval(intervalId);
    }

  }, [
    pomoTimeState.completed,
    endTime,
    typeTime,
    statusPomo,
    pomoTimeState.currentSessionTime,
    pomoTimeState.status,
    pomoTimeDispatch,
  ]);

  function onChangeStatusPomo(status: "done" | "ready" | "in-progress" | "pause") {
    setStatusPomo(status);

    audioRefPomoStatusChange.current?.play();
  }

  return (
    <div className="clock p-4 flex flex-col items-center text-white">
      <div className="flex items-center gap-2 drop-shadow-2xl">
        <span className="time-text">
          {formatTime(pomoTimeState.currentSessionTime)}
        </span>
      </div>

      {/* Progess*/}
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