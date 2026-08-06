"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavActions() {
    const pathname = usePathname();

    if (pathname !== "/pomodoro") {
        return null;
    }

    return (
        <button onClick={() => alert("Pomodoro settings")}>
            <Image src="/gear.svg" alt="Settings" width={24} height={24} style={{ filter: 'invert(1)' }} />
        </button>
    );
}