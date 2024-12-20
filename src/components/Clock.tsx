'use client'

import { ClockProps } from "@/type";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import DropdownMenuTypeTime from "./DropdownMenuTypeTime";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { changeStatusCurrentSessionTime, countDownCurrentSessionTime } from "@/lib/pomodoroTimesSlice";
import { formatTime, getGreeting } from "@/lib/utils";

export default function Clock({ initTimeSecond, status, type }: ClockProps) {

  const pomoTimeState = useAppSelector((state) => state.pomotimer);

  const pomoTimeDispatch = useAppDispatch();

  const [statusPomo, setStatusPomo] = useState(status);
  const [timeNow, setTimeNow] = useState(new Date());
  const [typeTime, setTypeTime] = useState(type)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRefCountdown = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {

    // If the timer is in progress, the current session time is greater than 0, and the status is pomodoro
    if (
      typeTime === "pomodoro-timer" &&
      statusPomo === 'in-progress' &&
      pomoTimeState.currentSessionTime >= 0 &&
      pomoTimeState.status === 'pomodoro'
    ) {

      // Play audio repeatedly when currentSessionTime is less than 10 seconds
      if (pomoTimeState.currentSessionTime < 10 && pomoTimeState.currentSessionTime > 0) {
        audioRefCountdown.current?.play();
      }


      // If currentSessionTime is 0, stop the audio and update session status
      if (pomoTimeState.currentSessionTime <= 0) {
        audioRef.current?.play();
        audioRefCountdown.current?.pause();
        pomoTimeDispatch(changeStatusCurrentSessionTime('break'));
        return;
      }

      // Update the current session time every second
      const intervalId = setInterval(() => {
        pomoTimeDispatch(countDownCurrentSessionTime());
      }, 1000); // Updates every 1 second

      // Cleanup the interval when the component unmounts or time reaches 0
      return () => clearInterval(intervalId);
    }
    else if (typeTime === "clock") {

      const intervalId = setInterval(() => {
        setTimeNow((prevTime) => {
          clearInterval(intervalId); // Clear interval when time runs out
          return new Date();
        });
      }, 5000); // Updates every 1 second

      // Cleanup the interval when the component unmounts or time reaches 0
      return () => clearInterval(intervalId);
    }

  }, [typeTime, statusPomo, pomoTimeState.currentSessionTime, pomoTimeState.status, pomoTimeDispatch]);


  function formatClock() {
    return `${timeNow.getHours()} : ${timeNow.getMinutes()}`
  }


  return (
    <div className="clock p-4 flex flex-col items-center text-white">
      <div className="flex items-center gap-2">
        <span className="minute text-[120px]">{
          typeTime === 'pomodoro-timer' ? formatTime(pomoTimeState.currentSessionTime)
            : formatClock()
        }</span>

        <DropdownMenuTypeTime
          options={[
            { label: "Pomodoro", value: "pomodoro-timer" },
            { label: "Clock", value: "clock" },
          ]}
          onSelect={setTypeTime}
        />
      </div>

      {
        typeTime === 'clock' ? <h1>{getGreeting()}</h1>
          : (
            <div className="w-full bg-slate-300 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-white h-2.5 rounded-full" style={{ width: `${((pomoTimeState.totalSeconds - pomoTimeState.currentSessionTime) / pomoTimeState.totalSeconds) * 100}%` }}></div>

              <div className="toolbar flex justify-center py-2">
                {
                  typeTime === 'pomodoro-timer' && statusPomo !== 'pause' ? <Pause className="cursor-pointer" onClick={() => setStatusPomo('pause')} />
                    : <Play className="cursor-pointer" onClick={() => setStatusPomo('in-progress')} />
                }
              </div>
            </div>
          )
      }



      <audio id="audio-pomo-close" ref={audioRef} src="/audio/alter-close-pomo.mp3" preload="auto">
        <track kind="captions" />
      </audio>

      <audio id="audio-pomo-count-down" ref={audioRefCountdown} src="/audio/clock-ticking-second-countdown.mp3" preload="auto">
        <track kind="captions" />
      </audio>

    </div>
  )
}