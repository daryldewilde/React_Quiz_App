
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import UsernameForm from "../components/UsernameForm";
import PageLayout from "../components/PageLayout";
import { usePlayerContext } from "../hooks/usePlayerContext";
import {Typography } from "@mui/material";

// Home page component - entry point for the quiz app
export default function Home() {
    const playerContext = usePlayerContext();
    const navigate = useNavigate();
    // On homepage load, remove any admin credentials from localStorage.
    // If a player has already entered his name move to subjects.
    useEffect(() => {
        localStorage.removeItem("user-token");
        localStorage.removeItem("admin_name");
        if (playerContext.player !== "") {
            navigate("/subjects");
        }
    }, [playerContext.player, navigate]);

    return (
        <>
            <Header />
            <PageLayout>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
                        Welcome to the Quiz App
                    </Typography>
                    {/* Show username form only if no user is logged in */}
                    {playerContext.player === "" && <UsernameForm />}
            </PageLayout>
            <Footer />
        </>
    );
}
