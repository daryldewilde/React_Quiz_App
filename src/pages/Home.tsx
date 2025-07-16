import Header from "../components/Header";
import Footer from "../components/Footer";
import UsernameForm from "../components/UsernameForm";
import { useContext } from "react";
import { UserContext } from "../contexts/user";
import { UserContextType } from "../types/types";
import Main from "../components/Main";

import { useNavigate } from "react-router-dom";

export default function Home(){
    const userContext = useContext(UserContext) as UserContextType;
    const navigate = useNavigate()
    if (userContext.user !== ""){
        navigate("/subjects")
    }

    return(
        <>
            <Header />
            <Main>{userContext.user === ""&&  <UsernameForm />} </Main>
            <Footer />
        </>
    )
}

