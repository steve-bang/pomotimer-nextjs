export interface ClockProps{
    status? : ClockStatus
}

export type ClockStatus = 'ready' | 'in-progress' | 'pause' |'done' ;


export type PomodoroStatus = 'ready' | 'break' | 'pomodoro';

export interface IPomodoroTime{
    completed : boolean;
    breakDurationMinutes: number;
    focusDurationMinutes: number;
    currentSession: number;
    totalSession: number;
    status?: PomodoroStatus;
    currentTimeSecondRunning: number;
    totalTimeSecondRunning: number;
}

export interface CurrentSectionProps{
    currentSection: int; 
    totalSection: int;
}

export interface SelectItemProps {
    value: string;
    label: string;
}

export interface FeatureCardProps {
    title: string;
    description: string;
  }

export interface PomodoroTimeType {
    focusTimeSeconds: int;
    label: string; 
    breakTimeSeconds: int;
}