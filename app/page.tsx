import { debug } from "@/lib/debug";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className={`min-h-screen flex flex-col ${debug("bg-gray-900")}`}>
            <nav className={`h-16 ${debug("bg-amber-50 text-black")}`}>
                <div className="mx-auto flex h-full max-w-7xl items-center px-6">
                    {/* Nav */}
                </div>
            </nav>

            <main className={`flex-1 flex items-center ${debug("bg-amber-800")}`}>
                <div className="w-full px-6">
                    <div className="grid grid-cols-3 gap-6 items-center">
                        <div className={`p-6 rounded-lg text-white ${debug("bg-red-500")}`}>
                            <h1 className="text-6xl font-bold leading-tight pl-14">
                                Arlovas.
                                <br />
                                Cloud
                            </h1>
                        </div>

                        <div className={`p-6 rounded-lg text-white ${debug("bg-green-500")}`}>
                            <div className="glow-wrapper">
                                <div className="glow" />
                                <Image
                                    loading="eager"
                                    width={960}
                                    height={1093}
                                    src="/start.png"
                                    alt="Hexagrama Unicursal"
                                    className="w-72 rounded-lg relative z-10"
                                />
                            </div>
                        </div>

                        <div className={`p-6 rounded-lg text-white ${debug("bg-blue-500")}`}>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/blog">Blog</Link>
                                </li>
                                <li>
                                    <Link href="/tasks">Tasks</Link>
                                </li>
                                <li>
                                    <Link href="/pomodoro">Pomodoro</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <footer className={`h-50 ${debug("bg-black text-amber-50")}`}>
                <div className="mx-auto flex h-full max-w-7xl items-center px-6">
                    {/* Footer */}
                </div>
            </footer>
        </div>
    );
}