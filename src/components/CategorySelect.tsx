import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';

export default function CategorySelect(props:{cat:string,id:string}){
    const navigate = useNavigate()
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    
    function navigateToQuizPage(){
        navigate(`/quiz/${props.cat}`)
    }
    
    return(
        <div 
            id={props.id} 
            onClick={navigateToQuizPage} 
            className={`p-6 text-center cursor-pointer border rounded-lg hover:bg-opacity-80 ${themeContext.theme === "dark" ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600" : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"}`}
        >
            <h3 className="font-medium text-lg">{props.cat}</h3>
            <p className={`text-sm mt-1 ${themeContext.theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Click to start</p>
        </div>
    )
}