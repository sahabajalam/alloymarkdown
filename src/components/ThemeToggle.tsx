import React, { useEffect, useState } from 'react';
import { Sun, Moon, BookOpen } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Theme = 'light' | 'dark' | 'book';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as Theme;
            if (savedTheme) return savedTheme;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark', 'book');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            <button
                onClick={() => setTheme('light')}
                className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    theme === 'light'
                        ? "bg-white text-yellow-500 shadow-sm"
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                )}
                title="Light Mode"
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    theme === 'dark'
                        ? "bg-slate-700 text-blue-400 shadow-sm"
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                )}
                title="Dark Mode"
            >
                <Moon className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme('book')}
                className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    theme === 'book'
                        ? "bg-[#eaddcf] text-[#8c6b4a] shadow-sm"
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                )}
                title="Book Mode"
            >
                <BookOpen className="w-4 h-4" />
            </button>
        </div>
    );
};

export default ThemeToggle;
