
import Link from "next/link";
import { DialogSetting } from "./DialogSetting";
import { Avatar, AvatarImage } from "./ui/avatar";



export default function NavbarMenu() {
    return (
        <div className="flex justify-between py-4 px-8">
            <div className="logo-brand">
            <Link href={"/"}>
                <Avatar>
                    <AvatarImage src="logo.jpg" />
                </Avatar>
            </Link>
            </div>
            <DialogSetting />
        </div>
    );
}
