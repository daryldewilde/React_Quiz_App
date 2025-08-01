import { Datagrid, DeleteButton, EditButton, List, ReferenceField, SearchInput, ShowButton, TextField} from 'react-admin';
import CustomDeleteAll from '../CustomDeleteAll';

 
export default function QuestionsList(){

    const QuestionsFilters = [
       <SearchInput source="q" alwaysOn={true}/>
    ]

    return(
    <List  filters={QuestionsFilters}>
        <Datagrid rowClick="show" bulkActionButtons={<CustomDeleteAll />}>
            <TextField source="id" />
            <ReferenceField source="Category_id" reference="Categories" sortable={false}>
            <TextField source="name" />
            </ReferenceField>
            <TextField source="question_text" />
            <TextField source="answer_options" />
            <TextField source="correct_answer" />
            <EditButton />
            <ShowButton sx={{ color: 'cyan' }} />
            <DeleteButton />
        </Datagrid>
    </List>
    )
}