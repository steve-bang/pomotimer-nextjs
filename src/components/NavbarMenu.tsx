import Setting from "./ui/Setting";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import SelectPomotimerType from "./SelectPomotimerType";


export default function NavbarMenu() {


    return (
        <div className="flex justify-between py-4 px-8">
            <div className="text-white">Pomotimer</div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <Setting /> Setting
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Setting</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Pomodoro
                            </Label>
                            <SelectPomotimerType />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
