import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType} from '../types/types';
import { ReactNode } from "react";

export default function Main(props:{children:ReactNode}){
    const themeContext = useContext(ThemeContext)  as ThemeContextType
    return(
        <main className={`w-full h-full ${themeContext.theme === "dark"? "bg-gray-800 text-white ":"bg-white-100"} flex items-center justify-center`}>
            <div  className={`h-1/3 w-[80%] md:w-1/2 border border-gray-500 rounded-xl  p-8 shadow-xl  ${themeContext.theme === "light"?"bg-gray-200":"bg-gray-900"}`}>
                {props.children} 
            </div>
        </main>
    )
}