import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Convert minutes to seconds
 * @author mrsteve.bang@gmail.com
 * @param minutes The number of minutes to convert
 * @returns The number of seconds in the given minutes
 */
export function convertMinutesToSeconds(minutes: number): number {
  return minutes * 60;
}

/**
 * Format the time in MM:ss format
 * @param seconds The time in seconds
 * @returns The formatted time in MM:ss format
 */
export function formatTime(seconds: number): string {
  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad single-digit seconds with leading zero if needed
  const formattedMinutes: string = String(minutes).padStart(2, '0');
  const formattedSeconds: string = String(remainingSeconds).padStart(2, '0');

  // Return the formatted string in MM:ss format
  return `${formattedMinutes} : ${formattedSeconds}`;
}

/**
 * Get a greeting based on the current time of day. 
 * If the current time is between 6:00 and 11:59, return "Good Morning." 
 * If the current time is between 12:00 and 17:59, return "Good Afternoon." O
 * therwise, return "Good Evening."
 * @returns A greeting based on the current time of day
 */
export function getGreeting(): string {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 12) {
    return "Good Morning.";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good Afternoon.";
  } else {
    return "Good Evening.";
  }
}