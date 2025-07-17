import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Button from "../components/Button";
import { useThemeContext } from "../hooks/useThemeContext";
import { useUserContext } from "../hooks/useUserContext";

export default function Result() {
    // Get theme and user data from context
    const themeContext = useThemeContext();
    const userContext = useUserContext();
    
    // Get score and category from URL parameters
    const [searchParams] = useSearchParams();
    const score = searchParams.get("score");
    const category = searchParams.get("cat");
    
    // Navigation hook
    const navigate = useNavigate();
    
    // Store user name before clearing context
    const [userName, setUserName] = useState("");
   
    // Set message based on score (fixed typo: "Cogratulations" → "Congratulations")
    let content = {
        heading: "Congratulations!",
        paragraph: "Good job on scoring this high, keep it up!"
    };

    // Change message if score is low
    if (parseFloat(score!) < 5) {
        content = {
            heading: "Sorry!",
            paragraph: "Work harder, you might make it next time!"
        };
    }

    // Save score and clear user data when component loads
    useEffect(() => {
        // Save user's name and score to leaderboard
        const leaderboardData = JSON.parse(localStorage.getItem('leaderboard') || '{}');
        const currentCategory = category || 'unknown';
        
        if (!leaderboardData[currentCategory]) {
            leaderboardData[currentCategory] = [];
        }
        
        leaderboardData[currentCategory].push({
            name: userContext.user,
            score: parseInt(score || '0')
        });
        
        localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
        
        // Save username to display before clearing context
        setUserName(userContext.user);
        
        // Clear user data from storage and context
        localStorage.setItem("name", "");
        userContext.setUser("");
    }, [userContext, category, score]);

    // Navigate to leaderboard page
    function goToLeaderBoard() {
        navigate("/leaderboard");
    }

    return (
        <>
            <Header />
            <Main>
                <div className="text-center">
                    <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {category}
                    </h1>
                    <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {content.heading} {userName}, you scored {score}/10
                    </h1>
                    <p className={`mb-6 md:mb-8 text-sm md:text-base ${themeContext.theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {content.paragraph}
                    </p>
                    <Button text="View Leaderboard" onClick={goToLeaderBoard} />
                </div>
            </Main>
            <Footer />
        </>
    );
}