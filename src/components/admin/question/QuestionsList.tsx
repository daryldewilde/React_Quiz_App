import { Datagrid, DeleteButton, EditButton, FunctionField, List, ReferenceField, SearchInput, ShowButton, TextField} from 'react-admin';

 
export default function QuestionsList(){

    const QuestionsFilters = [
       <SearchInput source="q" alwaysOn={true}/>
    ]

    return(
    <List  filters={QuestionsFilters}>
        <Datagrid rowClick="show" >
            <FunctionField label="id" render={(record) =>`${record.id.substring(0,8)}....`}/>
            <ReferenceField source="Category_id" reference="Categories">
                <TextField source="name" />
            </ReferenceField>
            <FunctionField label="question_text" render={(record) =>`${record.question_text.substring(0,50)}....`}/>
            <FunctionField label="answer_options" render={(record) =>`${record.answer_options.substring(0,50)}....`}/>
            <TextField source="correct_answer"/>
            <EditButton />
            <ShowButton sx={{ color: 'green' }} />
            <DeleteButton />
        </Datagrid>
    </List>
    )
}