
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';

export default function Footer() {
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    return (
        <footer className={`flex items-center justify-center h-16 p-5 border-t fixed bottom-0 w-full ${themeContext.theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-800 border-gray-300 text-white"}`}>
            <p className="text-sm">© 2025 Quiz App - Created by Daryl</p>
        </footer>
    )
}