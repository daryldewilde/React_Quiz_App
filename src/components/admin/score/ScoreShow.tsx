import { DeleteButton, ReferenceField } from "react-admin";
import { Show, SimpleShowLayout, TextField } from "react-admin";

export default function ScoreShow(){
    return(
        <Show>
            <SimpleShowLayout>
                <TextField source="id"/>
                <TextField source="name"/>
                <ReferenceField source="Category_id" reference="Categories">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="score"/>
                <TextField source="total_questions"/>
                <DeleteButton sx={{ bgcolor: '#f3f4f6', '&:hover': { bgcolor: '#e0e0e0' } }} />
            </SimpleShowLayout>
        </Show>
    )
}