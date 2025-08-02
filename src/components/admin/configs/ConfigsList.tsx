import { List, Datagrid, TextField, EditButton, ShowButton } from "react-admin";

export default function ConfigsList() {
    return (
        <List>
            <Datagrid rowClick="show">
                <TextField source="id" />
                <TextField source="QUESTIONS_LIMIT" label="Questions Limit" />
                <EditButton />
                <ShowButton sx={{ color: 'cyan' }} />
            </Datagrid>
        </List>
    );
}
