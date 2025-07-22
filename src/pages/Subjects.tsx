import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import {categories} from '../api';
import CategorySelect from "../components/CategorySelect"
import Button from "../components/Button";
import { useThemeContext } from "../hooks/useThemeContext";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";

// Subjects page - allows users to select quiz categories
export default function Subjects(){
    const navigate = useNavigate()
    const themeContext = useThemeContext()
    const userContext  = useUserContext()

    // Generate category selection components
    let catComponents = categories.map((category:string) => (
        <CategorySelect key={category} cat={category} id={category}/>
    ));
    
    // Navigate to a random quiz category
    function navigateToRandomQuiz(){
        if(userContext.user !== ""){
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            navigate(`/quiz/${randomCategory}`)
        }else{
            alert("You must Enter your Name to play")
            navigate("/")
        }
    }

    return(
        <>
            <Header />
            <Main>
                <div className="text-center">
                    <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${
                        themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                        Choose a Subject
                    </h1>
                    <p className={`mb-6 md:mb-8 text-sm md:text-base ${
                        themeContext.theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}>
                        Select the topic you'd like to be quizzed on
                    </p>
                    
                    {/* Category grid layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                        {catComponents}
                    </div>
                    
                    {/* Random quiz button */}
                    <Button text="Choose randomly" onClick={navigateToRandomQuiz}/>
                </div>
            </Main> 
            <Footer />
        </>
    )
}