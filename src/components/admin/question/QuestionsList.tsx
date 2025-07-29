import { Datagrid, EditButton, List, ReferenceField, TextField} from 'react-admin';


export default function QuestionsList(){
    return(
    <List >
        <Datagrid rowClick="show">
            <TextField source="id"/>
            <ReferenceField source="Category_id" reference="Categories">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="question_text"/>
            <TextField source="answer_options"/>
            <TextField source="correct_answer"/>
            <EditButton />
        </Datagrid>
    </List>
    )
}