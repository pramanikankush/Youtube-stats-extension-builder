import React, { useState, useEffect } from 'react';
import { CheckIcon, LoadingSpinner } from './icons';

const buildSteps = [
    "Initializing build...",
    "Creating manifest file...",
    "Adding scripts and styles...",
    "Embedding API credentials...",
    "Generating icons...",
    "Packaging extension...",
    "Finalizing..."
];

export const GeneratingStep: React.FC = () => {
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState<string>(buildSteps[0]);

    useEffect(() => {
        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex < buildSteps.length) {
                setCompletedSteps(prev => [...prev, buildSteps[stepIndex]]);
                stepIndex++;
                if (stepIndex < buildSteps.length) {
                    setCurrentStep(buildSteps[stepIndex]);
                } else {
                    setCurrentStep("Build complete!");
                }
            } else {
                clearInterval(interval);
            }
        }, 700);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Generating Your Extension</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Please wait while we assemble the files.</p>
            <div className="w-full max-w-sm text-left space-y-2">
                {completedSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 text-green-500 dark:text-green-400 animate-fade-in" style={{ animationDuration: '0.3s' }}>
                        <CheckIcon />
                        <span className="text-gray-500 dark:text-gray-400 line-through">{step}</span>
                    </div>
                ))}
                 {currentStep !== "Build complete!" && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 animate-fade-in" style={{ animationDelay: `${completedSteps.length * 100}ms` }}>
                        <LoadingSpinner />
                        <span>{currentStep}</span>
                    </div>
                 )}
            </div>
        </div>
    );
};