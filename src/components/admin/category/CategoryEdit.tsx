import { Edit, SimpleForm, TextInput } from "react-admin";

export default function CatergoryEdit(){
    return(
        <Edit>
            <SimpleForm>
                <TextInput source="name"/>
            </SimpleForm>
        </Edit>
    )
}