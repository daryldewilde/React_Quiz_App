import { Create, SimpleForm, TextInput } from "react-admin";

export default function CategoryCreate(){
    return(
        <Create>
             <SimpleForm>
                    <TextInput source="name"/>
            </SimpleForm>
        </Create>
    )
}