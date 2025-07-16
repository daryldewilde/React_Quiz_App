
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { ThemeContextType } from '../types/types';
import { useNavigate } from 'react-router-dom';
import Button from "./Button"

export default function UsernameForm(){
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    console.log(themeContext)
    let navigate = useNavigate()

    function startQuiz(formdata:any){
        let name = formdata.get("name")
        localStorage.setItem("name", name)
        navigate("/subjects")
    }
    return(
            <form action={startQuiz} className='flex flex-col items-center h-full justify-around' >
                <h1>Welcome!</h1>
                <p>Please Enter your name</p>
                <input  name="name" placeholder="Enter your name here" className="border rounded-xl py-2 px-3 " autoFocus/>
                <Button text="start" />
            </form>
    )
}

