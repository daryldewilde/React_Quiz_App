import { Datagrid, EditButton, List, TextField } from "react-admin";

export default function CategoriesList(){
    return(
    <List>
        <Datagrid rowClick="show">
            <TextField source="id"/>
            <TextField source="name"/>
            <EditButton />
        </Datagrid>
    </List>
    )
}