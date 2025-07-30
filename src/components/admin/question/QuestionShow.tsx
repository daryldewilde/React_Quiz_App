import { DeleteButton, EditButton, ReferenceField, ShowButton } from "react-admin";
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
                <DeleteButton sx={{ bgcolor: '#f3f4f6', '&:hover': { bgcolor: '#e0e0e0' } }} />
                <ShowButton sx={{ color: 'green' }} />
            </SimpleShowLayout>
        </Show>
    )
}