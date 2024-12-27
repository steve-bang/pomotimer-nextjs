import { CurrentSectionProps } from "@/type";

export default function CurrentSection({ currentSection, totalSection }: CurrentSectionProps) {
    return (<div className="text-2xl text-center py-2" >
        {`${currentSection}/${totalSection}`}
    </div>)
}