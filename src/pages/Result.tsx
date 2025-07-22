import { useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Button from "../components/Button";
import { useThemeContext } from "../hooks/useThemeContext";
import { useUserContext } from "../hooks/useUserContext";
import type { question } from "../types/types";
import { List, ListItem, Typography , Box} from "@mui/material";
import ReactConfetti from "react-confetti";



export default function Result() {
    // Get theme and user data from context
    const themeContext = useThemeContext();
    const userContext = useUserContext();
    
    // Get score and category from URL parameters
    const location = useLocation();
    const score:string = location.state.score;
    const category:string = location.state.category;
    const failedQuestions:question[] = location.state.failedQuestions;
    const totalQuestions:number = location.state.totalQuestions ;
    const [displayName, setDisplayName] = useState<string>("");
    
    // Navigation hook
    const navigate = useNavigate();
       
    // Set message based on score using switch case for 4 different ranges
    let result = {
        heading: "",
        message: ""
    };

    const scorePercentage = Math.floor((parseInt(score) / totalQuestions) * 100);
    
    switch (true) {
        case scorePercentage >= 90:
            result = {
                heading: "🎉 Excellent! 🏆",
                message: "Outstanding performance! You've mastered this topic! "
            };
            break;
        case scorePercentage >= 70:
            result = {
                heading: "👏 Great Job! 😊",
                message: "Well done! You have a solid understanding of the material!"
            };
            break;
        case scorePercentage >= 50:
            result = {
                heading: "👍 Good Effort! 💪",
                message: "Not bad! Keep practicing to improve your score!"
            };
            break;
        default:
            result = {
                heading: "💥 Oh No! 😱",
                message: "This is a disaster! Time to hit the books harder before coming back "
            };
            break;
    }

    // Map over failed questions to create list elements showing correct answers
    const failedQuestionsElements = failedQuestions.map( (q ) => {
        // Loop through all possible answers to find the correct one
        for (const answer in q.answers) {
            if (q?.correct_answers[`${answer}_correct`] === "true") {
            return(
                <ListItem className={`border rounded-xl mb-4 p-4 ${
                themeContext.theme === "dark" 
                    ? "bg-gray-700 border-gray-600" 
                    : "bg-white border-gray-300"
                }`}>
                <Box className="w-full">
                    <Typography variant="body1" component="p" className={`font-semibold mb-2 ${
                    themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                    ❓ Question: {q.question}
                    </Typography>
                    <Typography variant="body1" component="p" className={`${
                    themeContext.theme === "dark" ? "text-green-300" : "text-green-600"
                    }`}>
                    ✅ Answer: {q.answers[answer]}
                    </Typography>
                </Box >
                </ListItem>
            )
            } 
        }

        return <p>Couldn't get the correct answer</p>
    })


    // Save user name to display
    useEffect(() => {
        setDisplayName(userContext.user)

        return () => {
            localStorage.setItem("name", "");
            userContext.setUser("");
        };
       
    }, []);



    // Navigate to leaderboard page
    function goToLeaderBoard() {
        navigate("/leaderboard");
    }

    return (
        <>
            <Header />
            <Main>
                {scorePercentage >=50 && <ReactConfetti />}
                <div className="text-center">
                    <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {category}
                    </h1>
                    <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {result.heading} {displayName}, you scored {score}/{totalQuestions}
                    </h1>
                    <p className={`mb-6 md:mb-8 text-sm md:text-base ${themeContext.theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {result.message}
                    </p>
                    <h2 className={`text-xl md:text-xl font-semibold mb-2 ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>
                         Here are the correct answers to the questions you missed 
                    </h2>
                    <List className="list-none">
                        {failedQuestionsElements}
                    </List>
                    <Button text="View Leaderboard" onClick={goToLeaderBoard} />
                </div>
            </Main>
            <Footer />
        </>
    );
}