import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Typography, Box } from "@mui/material";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

export default function Custom404(){
    const navigate = useNavigate()
    return(
        <>
            <Header/>
            <Main>
                <Box className="flex flex-col items-center justify-center gap-4">
                    <Typography variant="body1" >404</Typography>
                    <Typography variant="body1" >OOPS we cannot find the page you are looking for</Typography>
                    <Button text="Go back to home page" onClick={()=>{navigate("/")}} />
                </Box>
            </Main>
            <Footer/>
        </>
    )
}