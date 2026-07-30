import { debug } from "@lib/debug";
import Image from "next/image";

export default function Home() {
    return (
        <div className={`min-h-screen flex flex-col ${debug("bg-gray-900 text-white")}`}>
            {/* MAIN */}
            <main className={`flex-1 flex items-center ${debug("bg-amber-800")}`}>
                <section
                    aria-label="Hero section"
                    className="w-full max-w-screen-2xl mx-auto px-4 md:px-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* LEFT */}
                        <div className={`p-6 rounded-lg ${debug("bg-red-500")}`}>
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                Arlovas.
                                <br />
                                Cloud
                            </h1>

                            <p className="mt-4 text-sm opacity-80 max-w-xs">
                                Personal tools, experiments
                                <br />
                                a space for building and exploring
                            </p>
                        </div>

                        {/* CENTER IMAGE */}
                        <div className={`p-6 rounded-lg flex justify-center ${debug("bg-green-500")}`}>
                            <div className="relative w-72 aspect-960/1093 glow-wrapper">
                                <div className="glow" />
                                <Image
                                    priority
                                    loading="eager"
                                    src="/start.png"
                                    alt="Hexagrama Unicursal"
                                    fill
                                    sizes="(max-width: 768px) 80vw, 288px"
                                    className="object-contain rounded-lg relative z-10"
                                />
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className={`p-6 rounded-lg ${debug("bg-blue-500")}`}>

                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className={`h-24 ${debug("bg-black text-amber-50")}`}>
                <div className="mx-auto flex h-full max-w-7xl items-center px-4 md:px-6 text-sm opacity-70">
                    © {new Date().getFullYear()} Arlovas Cloud
                </div>
            </footer>
        </div>
    );
}