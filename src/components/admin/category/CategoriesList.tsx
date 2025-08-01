import { Datagrid, DeleteButton, EditButton, FunctionField, List, SearchInput, ShowButton, TextField } from "react-admin";
import CustomDeleteAll from "../CustomDeleteAll";

 const categoriesFilters = [
       <SearchInput source="q"  alwaysOn={true}/>
    ]

export default function CategoriesList(){
    return(
    <List filters={categoriesFilters}>
        <Datagrid rowClick="show"  bulkActionButtons={<CustomDeleteAll />}>
            <FunctionField label="id" render={(record) =>`${record.id.substring(0,8)}....`}/>
            <TextField source="name"/>
                <EditButton />
            <ShowButton sx={{ color: 'cyan' }} />
            <DeleteButton />
        </Datagrid>
    </List>
    )
}