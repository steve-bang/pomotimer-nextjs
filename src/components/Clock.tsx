'use client'

import { ClockProps } from "@/type";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import DropdownMenuTypeTime from "./DropdownMenuTypeTime";
import { useAppSelector } from "@/lib/store";

export default function Clock( { initTimeSecond, status, type } : ClockProps ){

    const pomoTimeState = useAppSelector((state) => state.pomotimer);

    const [timePomodoro, setTimePomodoro] = useState(pomoTimeState.totalSeconds || initTimeSecond);
    const [statusPomo, setStatusPomo] = useState(status);
    const [timeNow, setTimeNow] = useState(new Date());
    const [progressPomodoto, setProgressPomodoro] = useState(0);
    const [typeTime, setTypeTime] = useState(type)
    const audioRef = useRef<HTMLAudioElement | null>(null);


    useEffect(() => {

      if( typeTime ==="pomodoro-timer" && statusPomo === 'in-progress') {
      
        // If timeLeft is 0, there's no need to continue the countdown
      if (timePomodoro < 0){
        audioRef.current?.play();
        return;
      }
    
      setProgressPomodoro(((initTimeSecond - timePomodoro)/initTimeSecond)*100);
  
      const intervalId = setInterval(() => {
        setTimePomodoro((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId); // Clear interval when time runs out
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Updates every 1 second
  
      // Cleanup the interval when the component unmounts or time reaches 0
      return () => clearInterval(intervalId);
      }
      else if (typeTime === "clock"){

        const intervalId = setInterval(() => {
          setTimeNow((prevTime) => {
            clearInterval(intervalId); // Clear interval when time runs out
            return new Date();
          });
        }, 5000); // Updates every 1 second
    
        // Cleanup the interval when the component unmounts or time reaches 0
        return () => clearInterval(intervalId);
      }

    }, [timePomodoro, statusPomo, timeNow]);
  
    function formatTime( seconds : number ) : string {
      // Calculate minutes and seconds
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
    
      // Pad single-digit seconds with leading zero if needed
      const formattedMinutes : string = String(minutes).padStart(2, '0');
      const formattedSeconds : string  = String(remainingSeconds).padStart(2, '0');
    
      // Return the formatted string in MM:ss format
      return `${formattedMinutes} : ${formattedSeconds}`;
    }

    function formatClock(){
      return `${timeNow.getHours()} : ${timeNow.getMinutes()}`
    }

    function getGreeting() : string {
      const currentHour = new Date().getHours();
  
      if (currentHour >= 6 && currentHour < 12) {
          return "Good Morning.";
      } else if (currentHour >= 12 && currentHour < 18) {
          return "Good Afternoon.";
      } else {
          return "Good Evening.";
      }
    }


    return (
        <div className="clock p-4 flex flex-col items-center text-white">
          <div className="flex items-center gap-2"> 
              <span className="minute text-[120px]">{
                typeTime === 'pomodoro-timer' ? formatTime(timePomodoro) 
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
                <div className="w-full bg-slate-300 opacity-75 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-white h-2.5 rounded-full" style={{width: `${progressPomodoto}%`}}></div>

                  <div className="toolbar flex justify-center py-2">
                    {
                      typeTime === 'pomodoro-timer'  && statusPomo !== 'pause' ? <Pause className="cursor-pointer" onClick={() => setStatusPomo('pause')} />
                      : <Play className="cursor-pointer" onClick={() => setStatusPomo('in-progress')} />
                    }
                  </div>
                </div>
              )
            }

            <audio id="audio-pomo-close" ref={audioRef} src="/audio/alter-close-pomo.mp3" preload="auto">
              <track kind="captions" />
            </audio>

        </div>
    )
}