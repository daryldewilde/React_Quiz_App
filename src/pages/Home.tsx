import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UsernameForm from "../components/UsernameForm";
import Main from "../components/Main";
import { useUserContext } from "../hooks/useUserContext";

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
            <Main>
                {/* Show username form only if no user is logged in */}
                {userContext.user === "" && <UsernameForm />}
            </Main>
            <Footer />
        </>
    );
}
