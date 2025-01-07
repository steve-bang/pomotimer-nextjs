import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface DropdownMenuTypeTimeProps {
    options: { label : string, value : "pomodoro-timer" | "clock" } [],
    onSelect: ( value : "pomodoro-timer" | "clock" ) => void
}

export default function DropdownMenuTypeTime ( { options, onSelect } : Readonly<DropdownMenuTypeTimeProps> )
{
    return (
        <div className="dropdown-menu-select-clock">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {
                options.map( (option) =>
                    <DropdownMenuItem key={option.value} onClick={() => onSelect(option.value)}>
                    {option.label}
                    </DropdownMenuItem>
                )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div> 
    )
}