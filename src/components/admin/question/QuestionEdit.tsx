import { Edit, SimpleForm, TextInput } from "react-admin";

export default function QuestionEdit(){
    return(
        <Edit>
            <SimpleForm>
                <TextInput source="question_text"/>
                <TextInput source="answer_options"/>
                <TextInput source="correct_answer"/>
            </SimpleForm>
        </Edit>
    )
}