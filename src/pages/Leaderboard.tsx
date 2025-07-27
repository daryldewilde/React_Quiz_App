
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
import { useThemeContext } from "../hooks/useThemeContext";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllScores } from "../api";
import type { Score } from "../types/types";


export default function Leaderboard() {
    const themeContext = useThemeContext();
    const [selectedSubject, setSelectedSubject] = useState<string>("");

    // Fetch all scores using tanstack query
    const { data: scoreData, isLoading, isError, error } = useQuery({
        queryKey: ["leaderboardscoreData"],
        queryFn: getAllScores,
        gcTime: 1000 * 20
    });

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });

    // Derive subjects from categories
    const subjects = categories ? categories.map((cat: { name: string }) => cat.name) : [];

    // Set default selected subject if not set and subjects exist
    if (!selectedSubject && subjects.length > 0) {
        setSelectedSubject(subjects[0]);
    }

    // Derive scores for selected subject
    const scores = selectedSubject && scoreData
        ? [...scoreData.filter((score: Score) => (score.category?.name || "") === selectedSubject)]
            .sort((a, b) => b.score / b.total_questions - a.score / a.total_questions)
        : [];

    return (
        <>
            <Header />
            <PageLayout>
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
                            {subjects.map((subject: string) => (
                                <option key={subject} value={subject}>
                                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {scores.length > 0 ? (
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
                                        {score.score}/{score["total_questions"]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !isLoading && (
                            <div className="text-center">
                                <p className={`text-lg ${
                                    themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                                }`}>
                                    No scores yet for <span className="font-semibold">{selectedSubject ? selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1) : "this category"}</span>. Be the first to take a quiz in this category!
                                </p>
                            </div>
                        )
                    )}
                </div>

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