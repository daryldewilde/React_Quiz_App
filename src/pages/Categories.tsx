import PageLayout from "../components/app/PageLayout";
import { getAllCategories } from '../api/api';
import { useQuery } from "@tanstack/react-query";
import CategorySelect from "../components/app/CategorySelect";
import Button from "../components/app/Button";
import { useThemeContext } from "../hooks/useThemeContext";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

// Categories page - allows users to select quiz categories
export default function Categories() {
    const navigate = useNavigate();
    const themeContext = useThemeContext();
    const playerContext = usePlayerContext();

    // Fetch categories dynamically using tanstack query
    type Category = { name: string };
    const { data: categories, isLoading, isError, error } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => getAllCategories()
    });

    // Debug: log what categories is
    console.log("Categories:", categories);
    const catComponents = Array.isArray(categories)
        ? categories.map((cat: { name: string }) => (
            <CategorySelect key={cat.name} cat={cat.name} id={cat.name} />
        ))
        : [];

    // Navigate to a random quiz category
    function navigateToRandomQuiz() {
        if (playerContext.player !== "") {
            if (!categories || categories.length === 0) return;
            const randomCategory = categories[Math.floor(Math.random() * categories.length)].name;
            navigate(`/quiz/${randomCategory}`);
        } else {
            alert("You must Enter your Name to play");
            navigate("/");
        }
    }

    return (
        <PageLayout>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>Choose a Category</Typography>
                <Typography sx={{ mb: 3, color: themeContext.theme === "dark" ? "grey.300" : "grey.600" }}>
                    Select the topic you'd like to be quizzed on
                </Typography>
                <Typography sx={{ fontWeight: "bold", mt: 2, mb: 2, color: themeContext.theme === "dark" ? "common.white" : "grey.900" }}>
                    {isLoading &&   <CircularProgress />}
                    {isError && `Error loading categories: ${error.message}`}
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr" }, gap: 2, mb: 4 }}>
                    {catComponents}
                </Box>
                <Button text="Choose randomly" onClick={navigateToRandomQuiz} />
        </PageLayout>
    );
}