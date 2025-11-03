import React from 'react';

export const AboutPage: React.FC = () => {
    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in-up text-gray-800 dark:text-gray-200">
            <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">About This Tool</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    The YouTube Stats Tracker Builder is a powerful utility designed for creators who want to keep a close eye on their channel's performance without any coding knowledge.
                </p>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p>
                        Our mission is to empower content creators by providing easy access to their YouTube analytics. With just your YouTube API Key and Channel ID, this tool automatically generates a personalized, lightweight Chrome extension. This extension sits conveniently in your browser, allowing you to view key statistics like subscriber counts, total views, and video uploads at a glance.
                    </p>
                    <p>
                        This project was built using a modern tech stack including React, TypeScript, and Tailwind CSS, and is powered by the Google Gemini API for its intelligent backend processing. We focused on creating a seamless, intuitive user experience with a clean, professional design that supports both light and dark modes.
                    </p>
                    <p>
                        Whether you're a budding creator or a seasoned YouTuber, this tool provides the quickest way to build your own stats tracker and stay updated on your channel's growth.
                    </p>
                </div>
            </div>
        </div>
    );
};
