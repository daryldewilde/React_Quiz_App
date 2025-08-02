import { EditButton, Show, SimpleShowLayout, TextField } from "react-admin";

export default function ConfigsShow() {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="QUESTIONS_LIMIT" label="Questions Limit" />
                 <EditButton />
            </SimpleShowLayout>
        </Show>
    );
}
