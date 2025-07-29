
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import UsernameForm from "../components/UsernameForm";
import PageLayout from "../components/PageLayout";
import { useUserContext } from "../hooks/useUserContext";
import {Typography } from "@mui/material";

// Home page component - entry point for the quiz app
export default function Home() {
    const userContext = useUserContext();
    const navigate = useNavigate();

    // Redirect to subjects page if user is already logged in
    useEffect(() => {
        if (userContext.user !== "") {
            navigate("/subjects");
        }
    }, [userContext.user, navigate]);

    return (
        <>
            <Header />
            <PageLayout>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
                        Welcome to the Quiz App
                    </Typography>
                    {/* Show username form only if no user is logged in */}
                    {userContext.user === "" && <UsernameForm />}
            </PageLayout>
            <Footer />
        </>
    );
}
