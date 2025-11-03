import React from 'react';
import { ExtensionIcon, MenuIcon, ToggleIcon } from './icons';

const InstructionStep: React.FC<{ number: number, icon: React.ReactNode, text: React.ReactNode }> = ({ number, icon, text }) => (
    <li className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-red-600/10 dark:bg-red-600/20 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center font-bold">{number}</div>
        <div className="flex items-center gap-3 pt-1">
             <div className="text-gray-500 dark:text-gray-400">{icon}</div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{text}</p>
        </div>
    </li>
);

export const DoneStep: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-500/10 dark:bg-green-500/20 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Extension Generated!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Your download should have started automatically.</p>

            <div className="w-full text-left bg-gray-100/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">How to Install:</h3>
                <ol className="space-y-4">
                     <InstructionStep
                        number={1}
                        icon={<MenuIcon />}
                        text={<>Open Chrome menu, go to <span className="font-semibold text-gray-800 dark:text-white">Extensions</span> → <span className="font-semibold text-gray-800 dark:text-white">Manage Extensions</span>.</>}
                     />
                     <InstructionStep
                        number={2}
                        icon={<ToggleIcon />}
                        text={<>Enable <span className="font-semibold text-gray-800 dark:text-white">"Developer mode"</span> using the toggle in the top-right.</>}
                     />
                     <InstructionStep
                        number={3}
                        icon={<ExtensionIcon />}
                        text="Unzip the downloaded file, then click 'Load unpacked' and select the unzipped folder."
                     />
                </ol>
            </div>
        </div>
    );
};