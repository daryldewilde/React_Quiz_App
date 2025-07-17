import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { useState, useContext, useEffect} from "react";
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Quiz(){
    const {category} = useParams()
    const [questionIndex, setQuestionIndex] = useState(0) 
    const [questions, setQuestions] = useState<any[]>([])
    const [question, setQuestion] = useState<any>(null) 
    const themeContext = useContext(ThemeContext) as ThemeContextType; 
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [score, setScore] = useState(0)
    const [buttonText, setButtonText] = useState("Next Question")
    const navigate = useNavigate()

    useEffect(() => {
        if (!category) return;

        axios.get("https://quizapi.io/api/v1/questions", {
            params: {
                apiKey: "SJN8Q0CYqwgfCbzRCnN3V284WpWYmYnPZJBaT63z" ,
                limit: 10,
                difficulty: "Medium",
                category: category,
            }
        })
        .then(response => {
            console.log(response.data)
            setQuestions(response.data);
            setQuestion(response.data[0]);
        })
        .catch(error => {
            console.error(error);
        });
    }, [category]);

   function nextQuestion(formData:any) {
        const answers = formData.getAll("answers");
        let correctCount = 0;
        let incorrectCount = 0;
        answers.forEach((answer: string) => {
            if ((question.correct_answers as any)[`${answer}_correct`] === "true") {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });
       
        let newScore =  score + correctCount - (incorrectCount * 0.5)
        // Score logic: +1 for each correct, -0.5 for each incorrect
        setScore(newScore);
        console.log(newScore)

        const newIndex = questionIndex + 1;
        if (newIndex < questions.length) {
            setQuestionIndex(newIndex);
            setSelectedAnswers([]);
            setQuestion(questions[newIndex]);
            setButtonText("Next Question");
        } else {
            if (newScore < 0) {
                newScore = 0;
                setScore(newScore);
            }
            navigate(`/result?cat=${category}&score=${newScore}`)
            
        }
        

    }

    

    let options = []
    //console.log(selectedAnswers)
    if (question && question.answers) {
        for (const key in question.answers) {
            if ((question.answers as any )[key] !== undefined && (question.answers as any )[key] !== null){
                 options.push(
                    <div key={key} onClick={() => setSelectedAnswers(prevSelectedAnswers => prevSelectedAnswers.includes(key) ? prevSelectedAnswers.filter(a => a !== key) : [...prevSelectedAnswers, key])} className={`flex items-center p-3 md:p-4 border rounded-lg hover:bg-opacity-80  cursor-pointer ${themeContext.theme === "dark" ? "bg-gray-700 border-gray-600 hover:bg-gray-600" : "bg-white border-gray-300 hover:bg-gray-50"}`}>
                        <input id={`bordered-radio-${key}`} type="checkbox" value={key} name="answers" className="w-4 h-4 mr-2 md:mr-3"  checked={selectedAnswers.includes(key)}/>
                        <label htmlFor={`bordered-radio-${key}`} className={`cursor-pointer text-sm md:text-base ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>{(question.answers as any )[key]}</label>
                    </div>
                )
            }
               
        }
    }

    return(
        <>
            <Header />
            <Main>
                {question ? (
                    <form action={nextQuestion} className='text-center'>
                        <h1 className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>{category}</h1>
                        <p className={`text-base md:text-lg mb-4 md:mb-6 ${themeContext.theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{question.question}</p>
                        <div className="flex flex-col gap-2 md:gap-3 mb-4 md:mb-6">
                            {options}
                        </div>
                        <div className="text-center">
                            <Button text={buttonText} />
                            <p className={`text-xs md:text-sm mt-2 md:mt-3 ${themeContext.theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Question {questionIndex + 1} of {questions.length}</p>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className={`text-lg ${themeContext.theme === "dark" ? "text-white" : "text-gray-900"}`}>Loading question...</p>
                    </div>
                )}
            </Main>
            <Footer />
        </>
    )
}