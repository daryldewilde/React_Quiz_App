
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';
import { useNavigate } from 'react-router-dom';
import Button from "./Button"

export default function UsernameForm(){
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    console.log(themeContext)
    let navigate = useNavigate()

    function startQuiz(formdata:any){
        let name = formdata.get("name")
        localStorage.setItem("name", name)
        navigate("/subjects")
    }
    return(
        <form action={startQuiz} className='flex flex-col items-center p-4 md:p-8' >
            <div className="text-center mb-4 md:mb-6">
                <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${themeContext.theme === "dark" ? "text-pink-400" : "text-pink-600"}`}>Welcome!</h1>
                <p className={`text-base md:text-lg ${themeContext.theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Let's get started with your quiz</p>
            </div>
            
            <div className="w-full max-w-xs md:max-w-sm mb-4 md:mb-6">
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${themeContext.theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Your Name
                </label>
                <input  
                    id="name"
                    name="name" 
                    placeholder="Enter your name here" 
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${themeContext.theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                    autoFocus
                    required
                />
            </div>
            
            <Button text="Start Quiz" />
        </form>
    )
}

