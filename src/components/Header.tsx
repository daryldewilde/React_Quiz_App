
import logo from '../assets/logo.svg';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';
import { Link } from 'react-router-dom';

export default function Header() {
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    //console.log(themeContext)
    function switchTheme() {
        if (themeContext.theme === "light") {
            localStorage.setItem("theme", "dark")
            themeContext.setTheme("dark");
        } else {
            localStorage.setItem("theme","light")
            themeContext.setTheme("light");
        }
    }
    //console.log(themeContext);
    return (
        <header>
            <nav className={`flex flex-col md:flex-row items-center justify-between p-3 md:p-5 border-b fixed top-0 w-full ${themeContext.theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-800 border-gray-300 text-white"} z-10`}>
                <div className='flex items-center mb-2 md:mb-0'>
                    <img src={logo} alt='logo' className="h-8 md:h-10 mr-2 md:mr-3" />
                    <h1 className="text-lg md:text-xl font-bold">Quiz App</h1>
                </div>
                
                <div className='flex items-center gap-4 md:gap-6'>
                    <div className='flex gap-3 md:gap-4'>
                        <Link to='/' className="text-sm md:text-base hover:text-pink-300">Home</Link>
                        <Link to='/subjects' className="text-sm md:text-base hover:text-pink-300">Subjects</Link>
                        <Link to='/leaderboard' className="text-sm md:text-base hover:text-pink-300">Leaderboard</Link>
                    </div>
                    
                    <button 
                        onClick={switchTheme}
                        className="p-2 rounded-lg hover:bg-gray-700"
                        aria-label={`Switch to ${themeContext.theme === "light" ? "dark" : "light"} theme`}
                    >
                        {themeContext.theme === "light" ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}