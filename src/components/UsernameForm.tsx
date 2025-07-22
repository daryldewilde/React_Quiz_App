
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../hooks/useThemeContext';
import { useUserContext } from '../hooks/useUserContext';
import Button from "./Button";

export default function UsernameForm() {
    // Get theme and user context using custom hooks
    const themeContext = useThemeContext();
    const userContext = useUserContext();
    const navigate = useNavigate();

    // Handle form submission when user starts quiz
    function startQuiz(formData: FormData) {
        const name = formData.get("name") as string;
        
        // Save name to localStorage and context
        localStorage.setItem("name", name);
        userContext.setUser(name);
        
        // Navigate to subjects page
        navigate("/subjects");
    }

    return (
        <form action={startQuiz} className='flex flex-col items-center p-4 md:p-8'>
            <div className="text-center mb-4 md:mb-6">
                <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${themeContext.theme === "dark" ? "text-pink-400" : "text-pink-600"}`}>
                    Welcome!
                </h1>
                <p className={`text-base md:text-lg ${themeContext.theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Let's get started with your quiz
                </p>
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
            
            <Button text="Start Quiz" type='submit'/>
        </form>
    );
}