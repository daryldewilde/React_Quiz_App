import { Edit, NumberInput, SimpleForm} from "react-admin";

export default function ConfigsEdit() {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="QUESTIONS_LIMIT" label="Questions Limit" />
            </SimpleForm>
        </Edit>
    );
}
