import { Datagrid, DeleteButton, FunctionField, List, ReferenceField, SearchInput, ShowButton, TextField } from "react-admin";
import CustomDeleteAll from "../CustomDeleteAll";



 const scoresFilters = [
       <SearchInput source="q"  alwaysOn={true}/>
    ]

export default function ScoresList(){
    return(
    <List filters={scoresFilters}>
        <Datagrid rowClick="show"  bulkActionButtons={<CustomDeleteAll />}>
            <FunctionField label="id" render={(record) =>`${record.id.substring(0,8)}....`}/>
            <TextField source="name"/>
            <ReferenceField source="Category_id" reference="Categories">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="score"/>
            <TextField source="total_questions"/>
          <ShowButton sx={{ color: 'cyan' }} />
          <DeleteButton />
        </Datagrid>
    </List>
    )
}