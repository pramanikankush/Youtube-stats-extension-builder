import React, { useState, useEffect } from 'react';
import { YouTubeIcon, SunIcon, MoonIcon } from './icons';
import type { Page } from '../types';

interface NavbarProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{ page: Page; currentPage: Page; setCurrentPage: (page: Page) => void; children: React.ReactNode }> = ({ page, currentPage, setCurrentPage, children }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                isActive 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
        >
            {children}
             {isActive && (
                <span className="block max-w-full h-0.5 bg-red-500 mt-1 transition-all duration-300"></span>
            )}
        </button>
    );
}


const ThemeToggle: React.FC<{ theme: 'dark' | 'light'; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Toggle theme"
    >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
);

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, currentPage, setCurrentPage }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-gray-200/50 dark:border-white/10 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
                        <YouTubeIcon />
                         <span className="text-lg font-bold text-gray-900 dark:text-white">YouTube Stats Tracker</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                       <NavItem page="home" currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavItem>
                       <NavItem page="about" currentPage={currentPage} setCurrentPage={setCurrentPage}>About</NavItem>
                       <NavItem page="contact" currentPage={currentPage} setCurrentPage={setCurrentPage}>Contact</NavItem>
                    </div>
                    <div className="flex items-center">
                         <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    </div>
                </div>
            </div>
             {/* Mobile Nav */}
            <div className="md:hidden flex items-center justify-center pb-2 space-x-2">
                 <NavItem page="home" currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavItem>
                 <NavItem page="about" currentPage={currentPage} setCurrentPage={setCurrentPage}>About</NavItem>
                 <NavItem page="contact" currentPage={currentPage} setCurrentPage={setCurrentPage}>Contact</NavItem>
            </div>
        </nav>
    );
};
