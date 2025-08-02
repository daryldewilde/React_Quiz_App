
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Button from "../components/Button";
import { useThemeContext } from "../hooks/useThemeContext";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { List, ListItem, Typography, Box } from "@mui/material";
import ReactConfetti from "react-confetti";
import type {failedQuestion} from "../types/types"; // Import the failedQuestion type

export default function Result() {
    // Hooks
    const themeContext = useThemeContext();
    const playerContext = usePlayerContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState<string>("");

    // State from navigation
    const score: string = location.state.score;
    const category: string = location.state.category;
    // failedQuestions now includes selectedAnswer property
    const failedQuestions: failedQuestion[] = location.state.failedQuestions;
    const totalQuestions: number = location.state.totalQuestions;

    // Save user name to display
    useEffect(() => {
        setDisplayName(playerContext.player);
        return () => {
            localStorage.setItem("name", "");
            playerContext.setPlayer("");
        };
    }, []);

    // Navigate to leaderboard page
    function goToLeaderBoard() {
        navigate("/leaderboard");
    }

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
    const failedQuestionsElements = failedQuestions.map((question) => {
        const answer_options: Record<string, string> = JSON.parse(question.answer_options);
        const correctAnswer = answer_options[question.correct_answer];
        const userAnswer = question.selectedAnswer ? answer_options[question.selectedAnswer] : undefined;
        return (
            <ListItem
                className={`border rounded-xl mb-4 p-4 ${
                    themeContext.theme === "dark"
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                }`}
            >
                <Box >
                    <Typography
                        variant="body1"
                        component="p"
                        className={`font-semibold mb-2 ${
                            themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                    >
                        ❓ Question: {question.question_text}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        className={`mb-1 ${
                            themeContext.theme === "dark" ? "text-red-300" : "text-red-600"
                        }`}
                    >
                        {userAnswer !== undefined ? `❌ Your answer: ${userAnswer}` : "No answer selected"}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        className={`mb-1 ${
                            themeContext.theme === "dark" ? "text-green-300" : "text-green-600"
                        }`}
                    >
                        {correctAnswer ? `✅ Correct answer: ${correctAnswer}` : "Couldn't get the correct answer"}
                    </Typography>
                </Box>
            </ListItem>
        );
    });

    return (
        <PageLayout>
            {scorePercentage >= 50 && <ReactConfetti />}
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>{category}</Typography>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>{result.heading} {displayName}, you scored {score}/{totalQuestions}</Typography>
                <Typography sx={{ mb: 3, color: themeContext.theme === "dark" ? "grey.300" : "grey.600" }}>{result.message}</Typography>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
                    Here are the correct answers to the questions you missed
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <List sx={{ listStyle: "none", p: 0, width: { md: "80%" } }}>
                        {failedQuestionsElements}
                    </List>
                </Box> <Button text="View Leaderboard" onClick={goToLeaderBoard} />
        </PageLayout>
    );
}