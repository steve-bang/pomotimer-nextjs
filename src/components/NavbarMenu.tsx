import Link from "next/link";
import { DialogSetting } from "./DialogSetting";





export default function NavbarMenu() {



    return (
        <div className="flex justify-between py-4 px-8">
            <div className="text-white font-medium"><Link href={"/"}>Pomotimer</Link></div>
            <DialogSetting />
        </div>
    );
}
