export interface ClockProps{
    type: 'pomodoro-timer' | 'clock';
    status? : 'ready' | 'in-progress' | 'pause' |'done' 
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