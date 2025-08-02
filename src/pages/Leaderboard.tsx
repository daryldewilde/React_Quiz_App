
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { useThemeContext } from "../hooks/useThemeContext";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllScores } from "../api/api";
import type { Score } from "../types/types";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";


export default function Leaderboard() {
    const themeContext = useThemeContext();
    const [selectedSubject, setSelectedSubject] = useState<string>("");

    // Fetch all scores using tanstack query
    const { data: scoreData, isLoading, isError, error } = useQuery({
        queryKey: ["leaderboardscoreData"],
        queryFn: () => getAllScores(),
        gcTime: 1000 * 20
    });

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(),
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
        <PageLayout>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
                    Leaderboard
                </Typography>
                <FormControl sx={{ mb: 3, width:{xs:"70%", md:"40%"} }}>
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
                    <Paper  elevation={3} sx={{overflowX: "auto", borderRadius: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{backgroundColor:themeContext.theme === "dark" ? "#1a1a2e": "#fff"   }}>
                                    <TableCell sx={{ padding: "12px", color: themeContext.theme === "dark" ? "#eaeaea" : "#232946" }}>#</TableCell>
                                    <TableCell sx={{ padding: "12px", color: themeContext.theme === "dark" ? "#eaeaea" : "#232946" }}>Name</TableCell>
                                    <TableCell sx={{ padding: "12px", color: themeContext.theme === "dark" ? "#eaeaea" : "#232946" }}>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {scores.map((score, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{backgroundColor: themeContext.theme === "dark" ? "#232946" : "#f5f5f5" }}
                                    >
                                        <TableCell sx={{ padding: "12px", fontWeight: "bold", color: themeContext.theme === "dark" ? "#bdbdbd" : "#616161" }}>
                                            #{index + 1}
                                        </TableCell>
                                        <TableCell sx={{ padding: "12px", color: themeContext.theme === "dark" ? "#fff" : "#232946" }}>
                                            {score.name}
                                        </TableCell>
                                        <TableCell sx={{ padding: "12px", fontWeight: "bold", color: themeContext.theme === "dark" ? "#ff69b4" : "#d81b60" }}>
                                            {score.score}/{score.total_questions}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                ) : (
                    <Typography align="center" sx={{ mt: 2 }}>
                        No scores yet for <b>{selectedSubject ? selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1) : "this category"}</b>. Be the first to take a quiz in this category!
                    </Typography>
                )}
        </PageLayout>
    );
}