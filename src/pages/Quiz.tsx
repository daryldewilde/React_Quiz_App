import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import { useParams } from "react-router-dom";
import { questions } from "../mockData";
import Button from "../components/Button";
import { useState, useContext } from "react";
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';

export default function Quiz(){
    const {category} = useParams()
    const [questionIndex, setQuestionIndex] = useState(0) 
    const [question, setQuestion] = useState(questions[0]) 
    const themeContext = useContext(ThemeContext) as ThemeContextType; 

    function nextQuestion() { 
        const newIndex = questionIndex + 1;
        if (newIndex < questions.length) {
            setQuestionIndex(newIndex);
            setQuestion(questions[newIndex]);
        } else {
        
            console.log("Quiz completed!");
        }
    }

    let options = []
    
    for (const key in question.answers) {
        if ((question.answers as any )[key] !== undefined && (question.answers as any )[key] !== null){
             options.push(
                <div key={key} className={`flex items-center p-4 border rounded-lg hover:bg-opacity-80 ${themeContext.theme === "dark" ? "bg-gray-700 border-gray-600 hover:bg-gray-600" : "bg-white border-gray-300 hover:bg-gray-50"}`}>
                    <input id={`bordered-radio-${key}`} type="radio" value={key} name="bordered-radio" className="w-4 h-4 mr-3" />
                    <label htmlFor={`bordered-radio-${key}`} className={`cursor-pointer ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>{(question.answers as any )[key]}</label>
                </div>
            )
        }
           
    }

    return(
        <>
            <Header />
            <Main>
                <form action={nextQuestion} className='text-center'>
                    <h1 className={`text-2xl font-bold mb-4 ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>{category}</h1>
                    <p className={`text-lg mb-6 ${themeContext.theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{question.question}</p>
                    <div className="flex flex-col gap-3 mb-6">
                        {options}
                    </div>
                    <div className="text-center">
                        <Button text="Next Question" />
                        <p className={`text-sm mt-3 ${themeContext.theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Question {questionIndex + 1} of {questions.length}</p>
                    </div>
                </form>
            </Main>
            <Footer />
        </>
    )
}