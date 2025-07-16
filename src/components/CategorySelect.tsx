import { useNavigate } from "react-router-dom";


export default function CategorySelect(props:{cat:string,id:string}){
    const navigate = useNavigate()
    function navigateToQuizPage(){
        navigate(`/quiz/${props.cat}`)
    }
    return(
        <div id={props.id} onClick={navigateToQuizPage} className="w-[30%]  m-[5px] p-[20px] text-center  border border-gray-700 rounded bg-gray-600">
            {props.cat}
        </div>
    )
}