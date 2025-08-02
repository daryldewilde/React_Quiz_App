import { Edit, required, SimpleForm, TextInput } from "react-admin";
import { validateQuestionsFunction } from "./QuestionCreate";

export default function QuestionEdit(){
    return(
        <Edit>
            <SimpleForm validate={validateQuestionsFunction}>
                <TextInput source="question_text" multiline rows={2} validate={required()}/>
                <TextInput source="answer_options" multiline rows={4} validate={required()}/>
                <TextInput source="correct_answer" validate={required()}/>
            </SimpleForm>
        </Edit>
    )
}