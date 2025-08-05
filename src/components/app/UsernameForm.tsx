
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../hooks/useThemeContext';
import { usePlayerContext } from '../../hooks/usePlayerContext';
import Button from "./Button";
import { Box } from '@mui/system';
import { TextField, Typography } from '@mui/material';
import helloPigeon from "../../anim/helloPigeon.json"
import Lottie from 'lottie-react';

export default function UsernameForm() {
    // Get theme and user context using custom hooks
    const themeContext = useThemeContext();
    const playerContext = usePlayerContext();
    const navigate = useNavigate();

    // Handle form submission when user starts quiz
    function startQuiz(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        
        // Save name to localStorage and context
        localStorage.setItem("name", name);
        playerContext.setPlayer(name);
        
        // Navigate to subjects page
        navigate("/subjects");
    }

    return (
        <Box component="form" onSubmit={startQuiz} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={2}                >
                    Welcome!
                </Typography>
                <Lottie  animationData={helloPigeon} style={{ width: 150, height: 150, margin: "0 auto" }} />

                <Typography
                    variant="body1"
                    mb={3}
                    color={themeContext.theme === "dark" ? "grey.300" : "grey.700"}
                >
                    Let's get started with your quiz
                </Typography>
                <TextField
                    id="name"
                    name="name"
                    label="Your Name"
                    placeholder="Enter your name here"
                    fullWidth
                    required
                    autoFocus
                    sx={{
                        mb: 3,
                        width: { xs: "80%", md: "50%" },
                        '& .MuiInputBase-input': {
                            color: themeContext.theme === "dark" ? '#fff' : '#222'
                        },
                        '& .MuiInputLabel-root': {
                            color: themeContext.theme === "dark" ? 'grey.300' : 'grey.700'
                        }
                    }}
                />
                <Button text="Start Quiz" type='submit'/>
            </Box>
    );
}