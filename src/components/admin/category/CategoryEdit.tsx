import { Edit, required, SimpleForm, TextInput, EditButton, DeleteButton } from "react-admin";
import { validateCategoryFunction } from "./CategoryCreate";

export default function CatergoryEdit(){
    return(
        <Edit>
            <SimpleForm validate={validateCategoryFunction}>
                <TextInput source="name" validate={required()}/>
                        <EditButton />
                <DeleteButton />
            </SimpleForm>
        </Edit>
    )
}