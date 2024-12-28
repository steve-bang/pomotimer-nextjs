"use client";

import { ClockProps } from "@/type";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import DropdownMenuTypeTime from "./DropdownMenuTypeTime";
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

export default function Clock({ status, type }: Readonly<ClockProps>) {
  const pomoTimeState = useAppSelector((state) => state.pomotimer);

  const pomoTimeDispatch = useAppDispatch();

  const [statusPomo, setStatusPomo] = useState(status);
  const [timeNow, setTimeNow] = useState<Date | null>(null);
  const [typeTime, setTypeTime] = useState(type);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRefCountdown = useRef<HTMLAudioElement | null>(null);
  const audioRefAlterCompleted = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!timeNow) setTimeNow(new Date());

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
        pomoTimeDispatch(countDownCurrentSessionTime());
      }, 1000); // Updates every 1 second

      // Cleanup the interval when the component unmounts or time reaches 0
      return () => clearInterval(intervalId);
    } else if (typeTime === "clock") {
      const intervalId = setInterval(() => {
        setTimeNow(new Date());
      }, 1000); // Updates every 1 second

      // Cleanup the interval when the component unmounts or time reaches 0
      return () => clearInterval(intervalId);
    }
  }, [
    pomoTimeState.completed,
    timeNow,
    typeTime,
    statusPomo,
    pomoTimeState.currentSessionTime,
    pomoTimeState.status,
    pomoTimeDispatch,
  ]);

  function formatClock() {
    return `${timeNow?.getHours()} : ${timeNow?.getMinutes()}`;
  }

  return (
    <div className="clock p-4 flex flex-col items-center text-white">
      <div className="flex items-center gap-2 drop-shadow-2xl ">
        <span className="minute text-[120px]">
          {typeTime === "pomodoro-timer"
            ? formatTime(pomoTimeState.currentSessionTime)
            : formatClock()}
        </span>

        <DropdownMenuTypeTime
          options={[
            { label: "Pomodoro", value: "pomodoro-timer" },
            { label: "Clock", value: "clock" },
          ]}
          onSelect={setTypeTime}
        />
      </div>

      {typeTime === "clock" ? (
        <h1>{getGreeting()}</h1>
      ) : (
        <>
          <div className="w-full border-1  border-white outline outline-1 h-4 dark:bg-gray-800 flex items-center rounded-full">
            {/* Display progress of the section */}
            {pomoTimeState.status === "pomodoro" ? (
              <div
                className="bg-white h-3.5 rounded-full"
                style={{
                  width: `${
                    ((pomoTimeState.totalSeconds -
                      pomoTimeState.currentSessionTime) /
                      pomoTimeState.totalSeconds) *
                    100
                  }%`,
                }}
              ></div>
            ) : (
              <div
                className="bg-white h-3.5 rounded-full"
                style={{
                  width: `${
                    ((pomoTimeState.totalSecondBreak -
                      pomoTimeState.currentSessionTime) /
                      pomoTimeState.totalSecondBreak) *
                    100
                  }%`,
                }}
              ></div>
            )}
          </div>

          {/* Display current section */}
          <CurrentSection
            currentSection={pomoTimeState.currentSession}
            totalSection={pomoTimeState.totalSessions}
          />

          {/* Display button Play or Pause */}
          <div className="toolbar flex justify-center py-2 ">
            {typeTime === "pomodoro-timer" && statusPomo !== "pause" ? (
              <Pause
                className="cursor-pointer bg-slate-400 p-2 rounded-full"
                size={50}
                onClick={() => setStatusPomo("pause")}
              />
            ) : (
              <Play
                className="cursor-pointer bg-slate-400 p-2 rounded-full"
                size={50}
                onClick={() => setStatusPomo("in-progress")}
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

      <AlertDialog open={pomoTimeState.completed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hoàn thành pomodoro</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn đã hoàn thành tốt pomodoro hôm nay. Bạn có muốn tiếp tục
              không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
