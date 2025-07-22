
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';
import { Box } from '@mui/system';

export default function Footer() {
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    return (
        <Box   className={`flex flex-col md:flex-row items-center justify-around h-auto md:h-16 p-3 md:p-5 border-t fixed bottom-0 w-full ${themeContext.theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-800 border-gray-300 text-white"}`} component="footer">
            <p className="text-xs md:text-sm mb-2 md:mb-0">© 2025 Quiz App - daryldev. All Rights Reserved.</p>
            <div className="social-links">
                <a href="https://www.linkedin.com/in/nfoye-djomo-daryl-dewilde-0ba897311/" target="_blank" rel="noopener noreferrer" className="linkedin">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://wa.me/237699255753" target="_blank" rel="noopener noreferrer" className="whatsapp">
                    <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://youtube.com/@daryldev" target="_blank" rel="noopener noreferrer" className="youtube" >
                    <i className="fab fa-youtube"></i>
                </a>
                <a href="https://github.com/daryldewilde" target="_blank" rel="noopener noreferrer" className="github">
                    <i className="fab fa-github"></i>
                </a>
            </div>
        </Box>
    )
}