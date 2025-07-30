import { Datagrid, DeleteButton, EditButton, FunctionField, List, SearchInput, ShowButton, TextField } from "react-admin";

 const categoriesFilters = [
       <SearchInput source="q"  alwaysOn={true}/>
    ]

export default function CategoriesList(){
    return(
    <List filters={categoriesFilters}>
        <Datagrid rowClick="show">
            <FunctionField label="id" render={(record) =>`${record.id.substring(0,8)}....`}/>
            <TextField source="name"/>
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
    )
}