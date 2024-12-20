import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings } from "lucide-react";

export default function Setting() {
    return (<TooltipProvider>
        <Tooltip>
          <TooltipTrigger><Settings className="cursor-pointer text-white"/></TooltipTrigger>
          <TooltipContent>
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>);
}
