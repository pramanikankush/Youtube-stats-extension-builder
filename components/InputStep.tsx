import React from 'react';
import { HelpIcon } from './icons';

interface InputStepProps {
    apiKey: string;
    setApiKey: (value: string) => void;
    channelId: string;
    setChannelId: (value: string) => void;
    onValidate: () => void;
    error: string | null;
}

const InfoTooltip: React.FC<{ text: React.ReactNode }> = ({ text }) => (
    <div className="relative group flex items-center">
        <HelpIcon />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1.5 px-2.5 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            {text}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
        </div>
    </div>
);

export const InputStep: React.FC<InputStepProps> = ({ apiKey, setApiKey, channelId, setChannelId, onValidate, error }) => {
    const canSubmit = apiKey.trim() !== '' && channelId.trim() !== '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // The button is disabled if canSubmit is false, and the parent onValidate function
        // also checks for empty values. This check is redundant.
        if (canSubmit) {
            onValidate();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 animate-fade-in">
            <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">YouTube API Key</label>
                 <div className="relative">
                    <input
                        id="apiKey"
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API Key"
                        className="w-full bg-gray-100 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow duration-300"
                    />
                </div>
                 <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <InfoTooltip text={<>Get your key from the <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline font-semibold">Google Cloud Console</a>.</>} />
                    <span>How to get your API Key</span>
                </div>
            </div>
            <div>
                <label htmlFor="channelId" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">YouTube Channel ID</label>
                 <div className="relative">
                    <input
                        id="channelId"
                        type="text"
                        value={channelId}
                        onChange={(e) => setChannelId(e.target.value)}
                        placeholder="e.g., UC_x5XG1OV2P6uZZ5FSM9Ttw"
                        className="w-full bg-gray-100 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow duration-300"
                    />
                </div>
                 <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <InfoTooltip text={<>Find this on your channel's <a href="https://www.youtube.com/account_advanced" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline font-semibold">advanced settings</a> page.</>} />
                    <span>Where to find the Channel ID</span>
                </div>
            </div>

            {error && <p className="text-red-500 dark:text-red-400 text-sm text-center bg-red-500/10 dark:bg-red-900/30 border border-red-500/30 rounded-lg py-2 px-3">{error}</p>}
            
            <button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-500 disabled:to-gray-500 disabled:dark:from-gray-700 disabled:dark:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900"
            >
                Verify Details
            </button>
        </form>
    );
};