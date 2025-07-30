
import { useNavigate } from "react-router-dom";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { useThemeContext } from "../hooks/useThemeContext";
import { Box, Typography } from '@mui/material';



export default function CategorySelect(props:{cat:string,id:string}){
    const navigate = useNavigate()
    const themeContext = useThemeContext()
    const playerContext = usePlayerContext()
    
    function navigateToQuizPage(){
        if (playerContext.player !== "") {
            navigate(`/quiz/${props.cat}`);
        } else {
            alert("You must Enter your Name to play")
            navigate("/");
        }
    }
    
    return(
        <Box
            id={props.id}
            onClick={navigateToQuizPage}
            sx={{
                p: { xs: 2, md: 3 },
                textAlign: 'center',
                cursor: 'pointer',
                border: `1px solid ${themeContext.theme === 'dark' ? '#374151' : '#d1d5db'}`,
                borderRadius: 2,
                bgcolor: themeContext.theme === 'dark' ? '#374151' : '#fff',
                color: themeContext.theme === 'dark' ? '#fff' : '#111827',
                '&:hover': {
                    bgcolor:'#7998c7ff',
                },
                mb: 1
            }}
        >
            <Typography sx={{ fontWeight: 500, fontSize: { xs: 16, md: 18 } }}>{props.cat}</Typography>
            <Typography sx={{ fontSize: { xs: 12, md: 14 }, mt: 1, color: themeContext.theme === 'dark' ? '#d1d5db' : '#4b5563' }}>
                Click to start
            </Typography>
        </Box>
    )
}