
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Typography, Box } from "@mui/material";
import PageLayout from "../components/PageLayout";
import { useThemeContext } from "../hooks/useThemeContext";

export default function Custom404() {
    const navigate = useNavigate();
    const themeContext = useThemeContext();

    return (
        <PageLayout>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, minHeight: 300 }}>
                <Typography variant="h2" sx={{ color: themeContext.theme === "dark" ? "common.white" : "grey.900" }}>404</Typography>
                <Typography variant="body1" sx={{ color: themeContext.theme === "dark" ? "common.white" : "grey.900" }}>OOPS we cannot find the page you are looking for</Typography>
                <Button text="Go back to home page" onClick={() => { navigate("/"); }} />
            </Box>
        </PageLayout>
    );
}