import { Datagrid, List, ReferenceField, TextField } from "react-admin";

export default function ScoresList(){
    return(
    <List>
        <Datagrid rowClick="show">
            <TextField source="id"/>
            <TextField source="name"/>
            <ReferenceField source="Category_id" reference="Categories">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="score"/>
            <TextField source="total_questions"/>
        </Datagrid>
    </List>
    )
}