import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import { useThemeContext } from "../hooks/useThemeContext";
import type {Score, LeaderboardData} from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { fetchScores } from "../api";

export default function Leaderboard() {
    const themeContext = useThemeContext();
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [subjects, setSubjects] = useState<string[]>([]);
    const [scores, setScores] = useState<Score[]>([]);


    const {data, isLoading, isError, error} = useQuery({
        queryKey:["leaderboardData"],
        queryFn:fetchScores,
        gcTime:1000 * 20 //keep data for  20 seconds
    })

      console.log(data)
    
    // Load available subjects when component mounts
        useEffect(() => {
        if (data) {
            const leaderboardData: LeaderboardData = JSON.parse(data.score_data);
            const availableSubjects = Object.keys(leaderboardData);
            setSubjects(availableSubjects);
            
            // Set first subject as default if available
            if (availableSubjects.length > 0) {
                setSelectedSubject(availableSubjects[0]);
            }
        }
    }, [data]); // Add data as dependency

    // Load scores for selected subject
    useEffect(() => {
        if (selectedSubject && data) {
            const leaderboardData: LeaderboardData = JSON.parse(data.score_data);
            const subjectScores = leaderboardData[selectedSubject] || [];
            console.log(subjectScores+"subject scores")
            // Sort scores from highest to lowest
            const sortedScores = [...subjectScores].sort((a, b) => b.score/b.totalQuestions - a.score/a.totalQuestions);
            setScores(sortedScores);
        }
    }, [selectedSubject, data]); 

    return (
        <>
            <Header />
            <Main>
                {scores.length > 0 && <div className="container mx-auto px-4">
                    <h1 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Leaderboard
                    </h1>
                    
                    <div className="mb-6">
                        <select 
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className={`w-full max-w-xs p-2 rounded border ${
                                themeContext.theme === "dark" 
                                    ? "bg-gray-700 border-gray-600 text-white" 
                                    : "bg-white border-gray-300 text-gray-900"
                            }`}
                        >
                            {subjects.map(subject => (
                                <option key={subject} value={subject}>
                                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={`rounded-lg overflow-hidden ${themeContext.theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                        {scores.map((score, index) => (
                            <div 
                                key={index}
                                className={`flex items-center justify-between p-4 ${
                                    index % 2 === 0 
                                        ? themeContext.theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                                        : ""
                                }`}
                            >
                                <div className="flex items-center">
                                    <span className={`font-bold mr-4 ${
                                        themeContext.theme === "dark" ? "text-gray-300" : "text-gray-600"
                                    }`}>
                                        #{index + 1}
                                    </span>
                                    <span className={
                                        themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                                    }>
                                        {score.name}
                                    </span>
                                </div>
                                <span className={`font-bold ${
                                    themeContext.theme === "dark" ? "text-pink-400" : "text-pink-600"
                                }`}>
                                    {score.score}/{score.totalQuestions}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>}
                {/* when the scores array is empty*/}
                {scores.length == 0 && !isLoading &&(
                     <div className="text-center">
                        <p className={`text-lg ${
                            themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                            No leaderboard data available yet. Be the first to take a quiz!
                        </p>
                    </div>
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