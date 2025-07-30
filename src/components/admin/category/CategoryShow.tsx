import { DeleteButton, EditButton, Show, SimpleShowLayout, TextField } from "react-admin";

export default function CategoryShow(){
    return(
        <Show>
            <SimpleShowLayout>
                <TextField source="id"/>
                 <TextField source="name"/>
                <EditButton />
                <DeleteButton />
            </SimpleShowLayout>
        </Show>
    )
}