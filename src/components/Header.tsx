
import logo from '../assets/logo.svg';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';
import { Link } from 'react-router-dom';

export default function Header() {
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    console.log(themeContext)
    function switchTheme() {
        if (themeContext.theme === "light") {
            localStorage.setItem("theme", "dark")
            themeContext.setTheme("dark");
        } else {
            localStorage.setItem("theme","light")
            themeContext.setTheme("light");
        }
    }
    console.log(themeContext);
    return (
        <header>
            <nav className={`flex flex-col items-center p-5 border-b-[0.5px] border-gray-500 fixed top-0 w-full ${themeContext.theme === "dark"? "bg-gray-900 text-white ":"bg-gray-500"} z-10 justify-between md:flex-row`}>
                <div className='flex items-center'>
                    <img src={logo} alt='logo' className="h-[40px] mr-1.5" />
                    <h1 className="text-xl mr-auto">Quiz app</h1>
                </div>
                <div className='flex flex-col justify-around md:w-1/3 mr-4 md:flex-row'>
                    <Link to='/'>Home</Link>
                    <Link to='/subjects'>subjects</Link>
                    <Link to='/leaderboard'>Leaderboard</Link>
                </div>
                
            {themeContext.theme === "light" ?
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer transition-colors duration-200 hover:text-yellow-400"
                    onClick={switchTheme}
                    aria-label="Switch to dark theme"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
                :
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer transition-colors duration-200 hover:text-blue-400"
                    onClick={switchTheme}
                    aria-label="Switch to light theme"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
            }
            </nav>
        </header>
    );
}