import { Edit, required, SimpleForm, TextInput } from "react-admin";
import { validateQuestionsFunction } from "./QuestionCreate";

export default function QuestionEdit(){
    return(
        <Edit>
            <SimpleForm validate={validateQuestionsFunction}>
                <TextInput source="question_text" validate={required()}/>
                <TextInput source="answer_options" validate={required()}/>
                <TextInput source="correct_answer" validate={required()}/>
            </SimpleForm>
        </Edit>
    )
}