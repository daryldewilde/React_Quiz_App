import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useThemeContext } from "../hooks/useThemeContext";
import {baseUrl, queryParams, gcTime, staleTime} from "../api";
import { question } from "../types/types"; // Import the question type
import { useUserContext } from "../hooks/useUserContext";

export default function Quiz(){
    const {category}  = useParams<string>();
    const [questionIndex, setQuestionIndex] = useState<number>(0) 
    const [questions, setQuestions] = useState<question[]>([])
    const [question, setQuestion] = useState<question | null>(null) 
    const themeContext = useThemeContext() 
    const [selectedAnswer, setSelectedAnswer] = useState<string>()
    const [score, setScore] = useState<number>(0)
    const [failedQuestions, setFailedQuestions] =  useState<question[]>([])
    const [buttonText, setButtonText] = useState("Next Question")
    const navigate = useNavigate()
    const userContext = useUserContext()
    

    // Fetch questions from API using React Query
    const  { data, isLoading, isError, error} = useQuery<question[]>({
        queryKey:['questions'],
        queryFn:fetchQuestions,
        gcTime:gcTime,
        staleTime:staleTime
    })

    // Initialize quiz when data is loaded
    useEffect(() => {
        if (data) {
            setQuestions(data);
            setQuestion(data[0]);
        }
    }, [data]);

    // Fetch questions from the API
    function fetchQuestions(){ 
        return axios.get(baseUrl, {
            params: {...queryParams, category: category}
        }).then(response => response.data)
    }
      
    // Handle form submission and move to next question
    function nextQuestion(formData:FormData) {
        let newScore = score
        let failed = true

        const answers = formData.getAll("answers") as string[];
        answers.forEach((answer: string) => {
            // Score logic: +1 for each correct answer
            if (question?.correct_answers[`${answer}_correct`] === "true") {
                failed = false
                newScore++
                setScore(newScore);
                console.log(newScore)
            } 
        });      

        const newIndex = questionIndex + 1;
        if (newIndex < questions.length) {
            // Track failed questions for review
            if(failed && question){
                setFailedQuestions(prevFailedQuestions => [...prevFailedQuestions, question])
            }
            setQuestionIndex(newIndex);
            setSelectedAnswer("");
            setQuestion(questions[newIndex]);
            newIndex ===  questions.length -1 ? setButtonText("Finish"):setButtonText("Next Question");
            
        } else {
            // Quiz completed save the results navigate to results page
            const leaderboardData = JSON.parse(localStorage.getItem('leaderboard') || '{}');

            if (category){
                if (!leaderboardData[category]) {
                    leaderboardData[category] = [];
                }
                
                leaderboardData[category].push({
                    name: userContext.user,
                    score: newScore,
                    totalQuestions: questions.length
                });
                
                localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
            }
           

            navigate(`/result`,{
                state:{
                    score: newScore,
                    totalQuestions: questions.length,
                    failedQuestions: failedQuestions,
                    category: category
                }
            })
        }
    }

    // Generate answer options for current question
    let options = []
    if (question && question.answers) {
        for (const key in question.answers) {
            if (question.answers[key] !== undefined && question.answers[key] !== null){
                options.push(
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
                            onChange={(e)=>{e.target.checked = !e.target.checked}} 
                            checked={selectedAnswer === key}
                        />
                        <label 
                            htmlFor={`bordered-radio-${key}`} 
                            className={`cursor-pointer text-sm md:text-base ${
                                themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                        >
                            {question.answers[key]}
                        </label>
                    </div>
                )
            }
        }
    }

    return(
        <>
            <Header />
            <Main>
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
                            {question.question}
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
                {isLoading &&(
                    <div className="text-center">
                        <p className={`text-lg ${
                            themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                            Loading question...
                        </p>
                    </div>
                )}

                {/* Error state */}
                {isError &&(
                    <div className="text-center">
                        <p className={`text-lg ${
                            themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                            {error.message}
                        </p>
                    </div>
                )}
            </Main>
            <Footer />
        </>
    )
}