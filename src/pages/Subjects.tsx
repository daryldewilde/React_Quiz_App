import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import {categories} from '../mockData'
import CategorySelect from "../components/CategorySelect"
import Button from "../components/Button";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';

export default function Subjects(){
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    let catComponents = categories.map((category) => (
        <CategorySelect key={category} cat={category} id={category}/>
    ));
    
    return(
        <>
            <Header />
            <Main>
                <div className="text-center">
                    <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>Choose a Subject</h1>
                    <p className={`mb-6 md:mb-8 text-sm md:text-base ${themeContext.theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Select the topic you'd like to be quizzed on</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                        {catComponents}
                    </div>
                    
                    <Button text="Start Quiz" />
                </div>
            </Main> 
            <Footer />
        </>
    )
}