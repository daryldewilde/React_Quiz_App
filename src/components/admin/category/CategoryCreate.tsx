import { Create, required, SimpleForm, TextInput } from "react-admin";

export function validateCategoryFunction(values:{ name?: string }){
    const errors: { name?: string } = {};
    if (!values.name){
        errors["name"] = "The category Name is  Required";
    }
    return errors;
}

export default function CategoryCreate(){
    return(
        <Create>
             <SimpleForm validate={validateCategoryFunction}>
                    <TextInput source="name" validate={required()}/>
            </SimpleForm>
        </Create>
    )
}