import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import { useThemeContext } from "../hooks/useThemeContext";

// Define types for the leaderboard data
interface Score {
    name: string;
    score: number;
}

interface LeaderboardData {
    [key: string]: Score[];
}

export default function Leaderboard() {
    const themeContext = useThemeContext();
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [subjects, setSubjects] = useState<string[]>([]);
    const [scores, setScores] = useState<Score[]>([]);

    // Load available subjects when component mounts
    useEffect(() => {
        const leaderboardData: LeaderboardData = JSON.parse(localStorage.getItem('leaderboard') || '{}');
        const availableSubjects = Object.keys(leaderboardData);
        setSubjects(availableSubjects);
        
        // Set first subject as default if available
        if (availableSubjects.length > 0) {
            setSelectedSubject(availableSubjects[0]);
        }
    }, []);

    // Load scores for selected subject
    useEffect(() => {
        if (selectedSubject) {
            const leaderboardData: LeaderboardData = JSON.parse(localStorage.getItem('leaderboard') || '{}');
            const subjectScores = leaderboardData[selectedSubject] || [];
            // Sort scores from highest to lowest
            const sortedScores = [...subjectScores].sort((a, b) => b.score - a.score);
            setScores(sortedScores);
        }
    }, [selectedSubject]);

    return (
        <>
            <Header />
            <Main>
                <div className="container mx-auto px-4">
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

                    <div className={`rounded-lg overflow-hidden ${
                        themeContext.theme === "dark" ? "bg-gray-800" : "bg-white"
                    }`}>
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
                                    {score.score}/10
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </Main>
            <Footer />
        </>
    )
}