import React from 'react';
import { GithubIcon } from './icons';

export const ContactPage: React.FC = () => {
    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in-up text-gray-800 dark:text-gray-200">
            <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Get In Touch</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    We'd love to hear from you. Whether you have a question, feedback, or a partnership inquiry, here's how you can reach us.
                </p>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">General Inquiries</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            For general questions and feedback, please email me at:
                            <a href="mailto:pramanikankush@gmail.com" className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 font-medium ml-2 transition-colors">
                                pramanikankush@gmail.com
                            </a>
                        </p>
                    </div>
                     <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Technical Support</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            If you're experiencing technical issues, please reach out to our support team:
                            <a href="mailto:pramanikankush@gmail.com" className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 font-medium ml-2 transition-colors">
                                pramanikankush@gmail.com
                            </a>
                        </p>
                    </div>
                     <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Connect with Me</h2>
                         <p className="text-gray-700 dark:text-gray-300 mb-4">
                           You can find the source code and more of my work on GitHub.
                        </p>
                        <a href="https://github.com/ankushpramanik" target="_blank" rel="noopener noreferrer" className="btn-github">
                            <GithubIcon />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};