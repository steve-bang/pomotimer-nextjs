import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Convert minutes to seconds.
 * @author mrsteve.bang@gmail.com
 * @param minutes The number of minutes to convert
 * @returns The number of seconds in the given minutes
 */
export function convertMinutesToSeconds(minutes: number) : number {
  return minutes * 60;
}