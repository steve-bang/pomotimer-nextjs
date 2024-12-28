export interface ClockProps{
    initTimeSecond : number;
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

export interface PomodoroTimeType {
    focusTime: int;
    label: string; 
    breakTime: int;
}