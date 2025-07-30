import { DeleteButton, EditButton, Show, SimpleShowLayout, TextField } from "react-admin";

export default function CategoryShow(){
    return(
        <Show>
            <SimpleShowLayout>
                <TextField source="id"/>
                 <TextField source="name"/>
                <EditButton sx={{ bgcolor: '#f3f4f6', '&:hover': { bgcolor: '#e0e0e0' } }} />
                <DeleteButton sx={{ bgcolor: '#f3f4f6', '&:hover': { bgcolor: '#e0e0e0' } }} />
            </SimpleShowLayout>
        </Show>
    )
}