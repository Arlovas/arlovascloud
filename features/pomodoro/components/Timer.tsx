const MINUTES = Array.from({ length: 60 });

interface TimerProps {
    remainingSeconds: number;
    formattedTime: string;
    sessionType: "focus" | "shortBreak" | "longBreak";
}

const LABELS = {
    focus: {
        title: "Focus time",
        subtitle: "Deep work session",
    },
    shortBreak: {
        title: "Short break",
        subtitle: "Recharge",
    },
    longBreak: {
        title: "Long break",
        subtitle: "Recover",
    },
};

export default function Timer({
    formattedTime,
    sessionType,
}: TimerProps) {
    const labels = LABELS[sessionType];

    return (
        <>
            {/* {console.log('Render timer')} */}

            <div className="relative w-128 h-128 rounded-full border-4 border-red flex flex-col items-center justify-center overflow-hidden">
                {MINUTES.map((_, index) => {
                    const isMajor = index % 5 === 0;

                    return (
                        <div
                            key={index}
                            className="absolute inset-0 flex justify-center"
                            style={{
                                transform: `rotate(${index * 6}deg)`,
                            }}
                        >
                            <div
                                className={`
                                mt-2 rounded-full
                                ${isMajor
                                        ? "h-5 w-1.5 bg-red-500"
                                        : "h-2 w-px bg-red-400"
                                    }
                            `}
                            />
                        </div>
                    );
                })}

                <div className="flex-1 flex items-end justify-center pb-4">
                    <p className="text-gray-400 text-lg">
                        {/* {labels.title} */}
                    </p>
                </div>

                <div className="flex-2 flex items-center justify-center">
                    <h1 className="text-8xl font-bold text-white">
                        {/* {console.log(`FORMATED TIME` + formattedTime)} */}
                        {formattedTime}
                    </h1>
                </div>

                <div className="flex-1 flex items-start justify-center pt-4">
                    <p className="text-gray-400 text-lg">
                        {/* {labels.subtitle} */}
                    </p>
                </div>
            </div>
        </>
    );
}