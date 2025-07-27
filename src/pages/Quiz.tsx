
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
import Button from "../components/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useThemeContext } from "../hooks/useThemeContext";
import { useUserContext } from "../hooks/useUserContext";
import { createScore, getAllCategories, getAllQuestionsByCategory, linkScoreToCategory } from "../api";
import type { failedQuestion, question } from "../types/types";
import type { JSX } from "react";


export default function Quiz() {
    // Hooks
    const { category } = useParams();
    const navigate = useNavigate();
    const themeContext = useThemeContext();
    const userContext = useUserContext();

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
        queryFn: () => getAllQuestionsByCategory(category as string),
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
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories
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
                name: userContext.user,
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
                <div
                    key={key}
                    onClick={() => setSelectedAnswer(key)}
                    className={`flex items-center p-3 md:p-4 border rounded-lg hover:bg-opacity-80 cursor-pointer ${
                        themeContext.theme === "dark"
                            ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                            : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                >
                    <input
                        id={key}
                        type="radio"
                        value={key}
                        name="answers"
                        className="w-4 h-4 mr-2 md:mr-3"
                        checked={selectedAnswer === key}
                        readOnly
                    />
                    <label
                        htmlFor={`bordered-radio-${key}`}
                        className={`cursor-pointer text-sm md:text-base ${
                            themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                    >
                        {value as string}
                    </label>
                </div>
            ));
    }

    return (
        <>
            <Header />
            <PageLayout>
                {/* Quiz form with questions and answers */}
                {question && (
                    <form action={nextQuestion} className='text-center'>
                        <h1 className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 ${
                            themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                            {category}
                        </h1>
                        <p className={`text-base md:text-lg mb-4 md:mb-6 ${
                            themeContext.theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}>
                            {question.question_text}
                        </p>
                        <div className="flex flex-col gap-2 md:gap-3 mb-4 md:mb-6">
                            {options}
                        </div>
                        <div className="text-center">
                            <Button text={buttonText} />
                            <p className={`text-xs md:text-sm mt-2 md:mt-3 ${
                                themeContext.theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                                Question {questionIndex + 1} of {questions.length}
                            </p>
                        </div>
                    </form>
                )}

                {/* Loading state */}
                {isLoading && (
                    <div className="text-center">
                        <p className={`text-lg ${
                            themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                            Loading question...
                        </p>
                    </div>
                )}

                {/* Error state */}
                {isError && (
                    <div className="text-center">
                        <p className={`text-lg ${
                            themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                            {error.message}
                        </p>
                    </div>
                )}
            </PageLayout>
            <Footer />
        </>
    );
}