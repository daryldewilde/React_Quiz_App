import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import {categories} from '../mockData'
import CategorySelect from "../components/CategorySelect"
import Button from "../components/Button";

export default function Subjects(){
  

    let catComponents = categories.map((category) => (
        <CategorySelect key={category} cat={category} id={category}/>
    ));
    console.log(catComponents)
    return(
        <>
            <Header />
            <Main>
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-wrap" >
                        {catComponents}
                    </div>
                    <Button text="Next" />
                </div>
            </Main> 
            <Footer />
        </>
    )
}