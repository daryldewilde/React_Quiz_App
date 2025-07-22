import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useThemeContext } from "../hooks/useThemeContext";

export default function CategorySelect(props:{cat:string,id:string}){
    const navigate = useNavigate()
    const themeContext = useThemeContext()
    const userContext = useUserContext()
    
    function navigateToQuizPage(){
        if (userContext.user !== "") {
            navigate(`/quiz/${props.cat}`);
        } else {
            alert("You must Enter your Name to play")
            navigate("/");
        }
    }
    
    return(
        <div 
            id={props.id} 
            onClick={navigateToQuizPage} 
            className={`p-4 md:p-6 text-center cursor-pointer border rounded-lg hover:bg-opacity-80 ${themeContext.theme === "dark" ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600" : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"}`}
        >
            <h3 className="font-medium text-base md:text-lg">{props.cat}</h3>
            <p className={`text-xs md:text-sm mt-1 ${themeContext.theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Click to start</p>
        </div>
    )
}