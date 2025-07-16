
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';

export default function Footer() {
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    return (
        <footer className={`flex items-center h-[65px] p-5 border-t-[0.5px] border-gray-500 fixed bottom-0 w-full ${themeContext.theme === "dark"? "bg-gray-900 text-white ":"bg-gray-500"} z-10 justify-center`}>
            <p>© 2025 Quiz app Created by Daryl</p>
        </footer>
    )
}