import { DeleteButton, EditButton, ReferenceField } from "react-admin";
import { Show, SimpleShowLayout, TextField } from "react-admin";

export default function QuestionShow(){
    return(
        <Show>
            <SimpleShowLayout>
                <TextField source="id"/>
               <ReferenceField source="Category_id" reference="Categories">
                               <TextField source="name" />
                </ReferenceField>
                <TextField source="question_text"/>
                <TextField source="answer_options"/>
                <TextField source="correct_answer"/>
                <EditButton />
                <DeleteButton />
            </SimpleShowLayout>
        </Show>
    )
}