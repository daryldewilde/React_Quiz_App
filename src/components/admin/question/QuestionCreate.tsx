import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";

export default function QuestionCreate(){
 

    return(
        <Create>
             <SimpleForm>
                <ReferenceInput source="Category_id" reference="Categories">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="question_text"/>
                <TextInput source="answer_options"/>
                <TextInput source="correct_answer"/>
            </SimpleForm>
        </Create>
    )
}