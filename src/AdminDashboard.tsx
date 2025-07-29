import {Admin, Resource} from "react-admin"
import dataProvider from "./api/dataprovider";
import CategoriesList from "./components/admin/category/CategoriesList";
import CatergoryEdit from "./components/admin/category/CategoryEdit";
import CategoryCreate from "./components/admin/category/CategoryCreate";
import CategoryShow from "./components/admin/category/CategoryShow";
import ScoresList from "./components/admin/score/ScoresList";
import ScoreShow from "./components/admin/score/ScoreShow";
import QuestionsList from "./components/admin/question/QuestionsList";
import QuestionEdit from "./components/admin/question/QuestionEdit";
import QuestionShow from "./components/admin/question/QuestionShow";
import QuestionCreate from "./components/admin/question/QuestionCreate";

export default function AdminDashboard(){
    return (
        <Admin dataProvider={dataProvider} basename="/admin">
            {/* Define resources here */}
            <Resource name="Categories" list={CategoriesList} edit={CatergoryEdit} 
            create={CategoryCreate} show={CategoryShow}/>

            <Resource name="Scores" list={ScoresList}  show={ScoreShow} />

            <Resource name="Questions" list={QuestionsList} edit={QuestionEdit} 
            create={QuestionCreate} show={QuestionShow} />
        </Admin>
    )
    
}
