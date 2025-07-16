import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import { useParams } from "react-router-dom";
import { questions } from "../mockData";
import Button from "../components/Button";

export default function Quiz(){
    const {category} = useParams()

    return(
        <>
            <Header />
            <Main>
                <div>{category}

                <Button text="Next" />
                </div>
            </Main>
            <Footer />
        </>
    )
}