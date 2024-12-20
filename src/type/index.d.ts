export interface ClockProps{
    initTimeSecond : number;
    type: 'pomodoro-timer' | 'clock';
    status? : 'ready' | 'in-progress' | 'pause' |'done' 
}

export interface SelectItemProps {
    value: string;
    label: string;
}