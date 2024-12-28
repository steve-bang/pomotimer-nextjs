import { DialogSetting } from "./DialogSetting";





export default function NavbarMenu() {



    return (
        <div className="flex justify-between py-4 px-8">
            <div className="text-white font-medium">Pomotimer</div>
            <DialogSetting />
        </div>
    );
}
