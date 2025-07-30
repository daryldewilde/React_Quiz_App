
import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
import { useThemeContext } from "../hooks/useThemeContext";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllScores } from "../api/api";
import type { Score } from "../types/types";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress } from "@mui/material";


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
    // Filter and sort scores for the selected subject
    let scores: Score[] = [];
    if (selectedSubject && scoreData) {
        // Filter scores by selected subject
        scores = scoreData.filter((score: Score) => score.category?.name === selectedSubject);

        // Sort scores by percentage (highest first)
        scores.sort((a, b) => {
            const aPercent = a.score / a.total_questions;
            const bPercent = b.score / b.total_questions;
            return bPercent - aPercent;
        });
    }

    return (
        <>
            <Header />
            <PageLayout>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
                        Leaderboard
                    </Typography>
                    <FormControl sx={{ mb: 3, width: "50%" }}>
                        <InputLabel 
                            id="subject-select-label"
                            sx={{ color: themeContext.theme === 'dark' ? 'grey.300' : 'grey.800' }}
                        >
                            Subject
                        </InputLabel>
                        <Select
                            labelId="subject-select-label"
                            value={selectedSubject}
                            label="Subject"
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            sx={{
                                color: themeContext.theme === 'dark' ? 'grey.100' : 'grey.900',
                                backgroundColor: themeContext.theme === 'dark' ? '#232946' : '#fff',
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        bgcolor: themeContext.theme === 'dark' ? '#232946' : '#fff',
                                        color: themeContext.theme === 'dark' ? 'grey.100' : 'grey.900',
                                    }
                                }
                            }}
                        >
                            {subjects.map((subject: string) => (
                                <MenuItem key={subject} value={subject}>
                                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {isLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : isError ? (
                        <Typography color="error" align="center">
                            {error.message}
                        </Typography>
                    ) : scores.length > 0 ? (
                        <Box sx={{ borderRadius: 2, overflow: "hidden", bgcolor: themeContext.theme === "dark" ? "grey.900" : "background.paper" }}>
                            {scores.map((score, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        p: 2,
                                        bgcolor: index % 2 === 0 ? (themeContext.theme === "dark" ? "#2c3650ff" : "grey.100") : undefined
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{ fontWeight: "bold", mr: 2, color: themeContext.theme === "dark" ? "grey.300" : "grey.600" }}>
                                            #{index + 1}
                                        </Typography>
                                        <Typography sx={{ color: themeContext.theme === "dark" ? "common.white" : "grey.900" }}>
                                            {score.name}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontWeight: "bold", color: themeContext.theme === "dark" ? "pink.400" : "pink.600" }}>
                                        {score.score}/{score["total_questions"]}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography align="center" sx={{ mt: 2 }}>
                            No scores yet for <b>{selectedSubject ? selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1) : "this category"}</b>. Be the first to take a quiz in this category!
                        </Typography>
                    )}
            </PageLayout>
            <Footer />
        </>
    );
}