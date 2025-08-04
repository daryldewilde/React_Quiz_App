import PageLayout from "../components/app/PageLayout";
import Button from "../components/app/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useThemeContext } from "../hooks/useThemeContext";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { createScore, getAllCategories, getRandomQuestionsForCategory, linkScoreToCategory } from "../api/api";
import type { failedQuestion, question } from "../types/types";
import type { JSX } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";


export default function Quiz() {
    // Hooks
    const { category } = useParams();
    const navigate = useNavigate();
    const themeContext = useThemeContext();
    const playerContext = usePlayerContext();

    // State
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    // Track failed questions as question objects with selectedAnswer property
    const [failedQuestions, setFailedQuestions] = useState<failedQuestion[]>([]);
    const [buttonText, setButtonText] = useState("Next Question");

    // Fetch questions for the selected category using tanstack query
    const {
        data: questions = [],
        isLoading,
        isError,
        error
    } = useQuery<question[]>({
        queryKey: ['questions', category],
        queryFn: () => getRandomQuestionsForCategory(category as string),
        gcTime: 1000 * 60 * 20,
        staleTime: 1000 * 60 * 20
    });

    let question = questions[questionIndex];

    // Mutation for creating a new score
    const leaderboardMutation = useMutation({
        mutationFn: createScore,
        onError: (err) => {
            alert("Failed to submit score to leaderboard. Please try again.");
            console.error('Leaderboard API error:', err);
        }
    });

    // Fetch categories dynamically using tanstack query
    const { data: categories } = useQuery<{ name: string; objectId: string }[]>({
        queryKey: ["categories"],
        queryFn: () => getAllCategories()
    });

    const linkScoreToCategoryMutation = useMutation({
        mutationFn: ({ scoreId, categoryId }: { scoreId: string; categoryId: string }) =>
            linkScoreToCategory(scoreId, categoryId),
        onSuccess: () => {
            console.log("Score linked to category successfully");
        },
        onError: (error) => {
            console.error("Error linking score to category:", error);
        }
    });

    function nextQuestion() {
        // Capture current question and selectedAnswer before any state changes
        const currentQuestion = { ...question };
        const currentSelectedAnswer = selectedAnswer;
        let newScore = score;
        if (currentSelectedAnswer === currentQuestion.correct_answer) {
            newScore++;
        } else {
            setFailedQuestions(prevFailedQuestions => [
                ...prevFailedQuestions,
                { ...currentQuestion, selectedAnswer: currentSelectedAnswer }
            ]);
        }

        // It's not reliable to log failedQuestions here due to async state

        const newIndex = questionIndex + 1;
        if (newIndex < questions.length) {
            setScore(newScore);
            setQuestionIndex(newIndex);
            setSelectedAnswer("");
            question = questions[newIndex];
            setButtonText(newIndex === questions.length - 1 ? "Finish" : "Next Question");
        } else {
            const payload = {
                name: playerContext.player,
                score: newScore,
                total_questions: questions.length
            };
            console.log('Submitting score to leaderboard:', payload);
            leaderboardMutation.mutate(payload, {
                onSuccess: (data) => {
                    console.log('Leaderboard API success:', data);
                    // Find the category object from the categories list
                    const catObj = categories && categories.find((c: { name: string }) => c.name === category);
                    if (catObj && data.objectId) {
                        linkScoreToCategoryMutation.mutate({ scoreId: data.objectId, categoryId: catObj.objectId });
                    }
                    // Only navigate after linking attempt
                    navigate(`/result`, {
                        state: {
                            score: newScore,
                            totalQuestions: questions.length,
                            failedQuestions: failedQuestions,
                            category: category
                        }
                    });
                }
            });
        }
    }

    // Generate answer options for current question (Backendless format)
    let options: JSX.Element[] = [];
    if (question) {
        let answersObj: Record<string, string> = {};
        try {
            answersObj = JSON.parse(question.answer_options);
        } catch (e) {
            console.error("Invalid JSON in answer_options:", question.answer_options, e);
        }
        options = Object.entries(answersObj)
            .map(([key, value]) => (
                <Box
                    key={key}
                    onClick={() => setSelectedAnswer(key)}
                    sx={{
                        width:"80%",
                        display: "flex",
                        alignItems: "center",
                        p: { xs: 1, md: 2 },
                        border: 1,
                        borderRadius: 20,
                        cursor: "pointer",
                        bgcolor: themeContext.theme === "dark" ? "#374151" : "background.paper",
                        mb: 1,
                        '&:hover': {
                            bgcolor: themeContext.theme === "dark" ? "#697588ff" : "grey.50"
                        }
                    }}
                >
                    <input
                        id={key}
                        type="radio"
                        value={key}
                        name="answers"
                        style={{ width: 20, height: 20, marginRight: 12 }}
                        checked={selectedAnswer === key}
                        readOnly
                    />
                    <label
                        htmlFor={`bordered-radio-${key}`}
                        style={{
                            cursor: "pointer",
                            color: themeContext.theme === "dark" ? "#fff" : "#222"
                        }}
                    >
                        {value as string}
                    </label>
                </Box>
            ));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        nextQuestion();
    }

    return (
        <PageLayout>
            {/* Quiz form with questions and answers */}
            {question && (
                <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>{category}</Typography>
                    <Typography sx={{ mb: 3, color: themeContext.theme === "dark" ? "grey.300" : "grey.700" }}>{question.question_text}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4, 
                        alignItems:"center"
                    }}>
                        {options}
                    </Box>
                    <Button text={buttonText} type="submit" />
                    <Typography sx={{ mt: 2, color: themeContext.theme === "dark" ? "grey.400" : "grey.600",fontWeight:"bold" }}>
                        Question {questionIndex + 1} of {questions.length}
                    </Typography>
                </form>
            )}
            {/* Loading state */}
            {isLoading && (
                <Box sx={{ textAlign: "center", my: 4 }}>
                    <Typography variant="body1" sx={{ color: themeContext.theme === "dark" ? "common.white" : "grey.900" }}>
                            <CircularProgress />
                    </Typography>
                </Box>
            )}
            {/* Error state */}
            {isError && (
                <Box sx={{ textAlign: "center", my: 4 }}>
                    <Typography variant="body1" sx={{ color: themeContext.theme === "dark" ? "common.white" : "grey.900" }}>
                        {error.message}
                    </Typography>
                </Box>
            )}
        </PageLayout>
    );
}