import React, { useEffect, useState } from "react";

const STEPS = [
    { icon: "📄", label: "Reading your submission...", detail: "Extracting text and key facts from your input." },
    { icon: "🔍", label: "Searching legal database...", detail: "Running semantic search across High Court precedents." },
    { icon: "⚖️", label: "Matching provisions...", detail: "Identifying applicable Acts and Sections." },
    { icon: "🤖", label: "Consulting AI model...", detail: "Sending context to Gemini for legal synthesis." },
    { icon: "📝", label: "Summarizing findings...", detail: "Compiling structured case summary and insights." },
    { icon: "✅", label: "Finalizing your breakdown...", detail: "Almost done — preparing your legal analysis." },
];

const STEP_DURATION_MS = 2500;

export default function AnalyzingLoader() {
    const [currentStep, setCurrentStep] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
                setVisible(true);
            }, 250);
        }, STEP_DURATION_MS);

        return () => clearInterval(interval);
    }, []);

    const step = STEPS[currentStep];
    const progress = Math.round(((currentStep + 1) / STEPS.length) * 100);

    return (
        <div className="app-card border border-border p-6 max-w-md w-full mx-auto animate-popIn">
            {/* Animated spinning loader ring */}
            <div className="flex items-center justify-center mb-5">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/15 border-t-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-2xl select-none">
                        {step.icon}
                    </div>
                </div>
            </div>

            {/* Active step description */}
            <div
                className="text-center transition-opacity duration-250 min-h-[68px]"
                style={{ opacity: visible ? 1 : 0 }}
            >
                <p className="font-headline text-sm font-bold text-text-primary">
                    {step.label}
                </p>
                <p className="font-body text-[11px] text-text-secondary mt-1 max-w-xs mx-auto leading-relaxed">
                    {step.detail}
                </p>
            </div>

            {/* Progress slider bar */}
            <div className="mt-5 px-2">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="font-label text-[9px] uppercase tracking-widest text-text-secondary font-bold">
                        Step {currentStep + 1} of {STEPS.length}
                    </span>
                    <span className="font-label text-[10px] font-extrabold text-primary">{progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Milestone indicator dots */}
            <div className="mt-4 flex items-center justify-center gap-1.5">
                {STEPS.map((_, i) => (
                    <span
                        key={i}
                        className={`rounded-full transition-all duration-300 ${i < currentStep
                                ? "w-2.5 h-1.5 bg-primary/60"
                                : i === currentStep
                                    ? "w-4 h-1.5 bg-primary"
                                    : "w-1.5 h-1.5 bg-border"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}