import React, { useState, useEffect, useCallback } from 'react';
import type { ChannelData, Step, Page } from './types';
import { validateChannel } from './services/youtubeService';
import { generateExtensionZip } from './services/extensionService';
import { InputStep } from './components/InputStep';
import { SuccessStep } from './components/SuccessStep';
import { GeneratingStep } from './components/GeneratingStep';
import { DoneStep } from './components/DoneStep';
import { LoadingSpinner, YouTubeIcon } from './components/icons';
import { Navbar } from './components/Navbar';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { env } from './config/env';

const App: React.FC = () => {
    const [step, setStep] = useState<Step>('input');
    const [apiKey, setApiKey] = useState<string>('');
    const [channelId, setChannelId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [channelData, setChannelData] = useState<ChannelData | null>(null);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [currentPage, setCurrentPage] = useState<Page>('home');

     useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };


    const handleValidation = useCallback(async () => {
        if (!apiKey || !channelId) return;

        setStep('verifying');
        setError(null);
        setChannelData(null);

        try {
            const data = await validateChannel(apiKey, channelId);
            setChannelData(data);
            setStep('success');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setStep('input');
        }
    }, [apiKey, channelId]);

    const handleEdit = () => {
        setStep('input');
        setError(null);
    };

    const handleGenerate = async () => {
        if (!channelData || !apiKey || !channelId) return;
        setStep('generating');
        try {
            await generateExtensionZip(apiKey, channelId, channelData.snippet.title);
            setStep('done');
        } catch (err)
 {
            setError(err instanceof Error ? err.message : 'Failed to generate extension.');
            setStep('success');
        }
    };
    
    const renderTrackerStep = () => {
        switch (step) {
            case 'input':
                return (
                    <InputStep
                        apiKey={apiKey}
                        setApiKey={setApiKey}
                        channelId={channelId}
                        setChannelId={setChannelId}
                        onValidate={handleValidation}
                        error={error}
                    />
                );
            case 'verifying':
                return (
                    <div className="text-center">
                        <LoadingSpinner />
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Verifying details...</p>
                    </div>
                );
            case 'success':
                return channelData && <SuccessStep channelData={channelData} apiKey={apiKey} onEdit={handleEdit} onGenerate={handleGenerate} />;
            case 'generating':
                return <GeneratingStep />;
            case 'done':
                return <DoneStep />;
            default:
                return null;
        }
    };
    
    const renderPage = () => {
        switch(currentPage) {
            case 'home':
                return (
                     <div className="z-10 w-full max-w-md animate-fade-in-up">
                        <header className="text-center mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-500 dark:from-red-400 dark:via-rose-400 dark:to-red-400 bg-[size:200%_auto] animate-gradient">
                                Generate your own extension
                            </h1>
                            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '500ms' }}>
                                Create a personalized YouTube stats tracker in seconds.
                            </p>
                        </header>

                        <main className="w-full bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-red-500/10 transition-all duration-500">
                            <div className="p-6 sm:p-8 min-h-[350px] flex items-center justify-center">
                               {renderTrackerStep()}
                            </div>
                        </main>
                        <footer className="text-center mt-8 text-gray-400 dark:text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '400ms' }}>
                            <p>Powered by Gemini</p>
                        </footer>
                    </div>
                );
            case 'about':
                return <AboutPage />;
            case 'contact':
                return <ContactPage />;
            default:
                return null;
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4 font-sans relative overflow-hidden">
             {/* Background decorations */}
            <div className="absolute inset-0 bg-grid-gray-200/[0.5] dark:bg-grid-gray-700/[0.2] bg-[length:20px_20px]"></div>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            
            <Navbar theme={theme} toggleTheme={toggleTheme} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            
            <div className="w-full flex flex-col items-center justify-center flex-grow pt-24 pb-8">
                {renderPage()}
            </div>
        </div>
    );
};

export default App;