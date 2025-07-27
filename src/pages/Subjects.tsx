
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
import { getAllCategories } from '../api';
import { useQuery } from "@tanstack/react-query";
import CategorySelect from "../components/CategorySelect";
import Button from "../components/Button";
import { useThemeContext } from "../hooks/useThemeContext";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";

// Subjects page - allows users to select quiz categories
export default function Subjects() {
    const navigate = useNavigate();
    const themeContext = useThemeContext();
    const userContext = useUserContext();

    // Fetch categories dynamically using tanstack query
    const { data: categories, isLoading, isError, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories
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
        if (userContext.user !== "") {
            if (!categories || categories.length === 0) return;
            const randomCategory = categories[Math.floor(Math.random() * categories.length)].name;
            navigate(`/quiz/${randomCategory}`);
        } else {
            alert("You must Enter your Name to play");
            navigate("/");
        }
    }

    return (
        <>
            <Header />
            <PageLayout>
                <div className="text-center">
                    <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${
                        themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                        Choose a Subject
                    </h1>
                    <p className={`mb-6 md:mb-8 text-sm md:text-base ${
                        themeContext.theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}>
                        Select the topic you'd like to be quizzed on
                    </p>

                    <div  className={`text-xl md:text-2xl font-bold mt-2 ${
                        themeContext.theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                        {isLoading && "Loading categories....."}
                        {isError && `Error loading categories: ${error.message}`}
                    </div>

                    {/* Category grid layout */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                        {catComponents}
                    </div>

                    {/* Random quiz button */}
                    <Button text="Choose randomly" onClick={navigateToRandomQuiz} />
                </div>
            </PageLayout>
            <Footer />
        </>
    );
}