import { Edit, required, SimpleForm, TextInput, EditButton, DeleteButton } from "react-admin";
import { validateCategoryFunction } from "./CategoryCreate";

export default function CatergoryEdit(){
    return(
        <Edit>
            <SimpleForm validate={validateCategoryFunction}>
                <TextInput source="name" validate={required()}/>
                        <EditButton />
                <DeleteButton sx={{ bgcolor: '#f3f4f6', '&:hover': { bgcolor: '#e0e0e0' } }} />
            </SimpleForm>
        </Edit>
    )
}