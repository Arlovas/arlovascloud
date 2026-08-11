import Link from "next/link";
import NavActions from "./NavActions";

export default function SiteNav() {
    return (
        <header className="shrink-0">
            <nav className="h-16">
                <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
                    <div className="font-semibold">
                        <Link href="/">Arlovas</Link>
                    </div>

                    <ul className="flex gap-6 text-sm items-center">
                        <li>
                            <Link className="hover:underline focus-visible:outline" href="/blog">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline focus-visible:outline" href="/tasks">
                                Tasks
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline focus-visible:outline" href="/pomodoro">
                                Pomodoro
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
