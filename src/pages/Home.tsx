
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UsernameForm from "../components/app/UsernameForm";
import PageLayout from "../components/app/PageLayout";
import { usePlayerContext } from "../hooks/usePlayerContext";

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
        <PageLayout>
                {playerContext.player === "" && <UsernameForm />}
        </PageLayout>
    );
}
