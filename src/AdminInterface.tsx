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
import CategoryIcon from '@mui/icons-material/Category';
import ScoreIcon from '@mui/icons-material/Score';
import QuizIcon from '@mui/icons-material/Quiz';
import AppBar from "./components/admin/AppBar";

export default function AdminInterface(){
    return (
        <Admin  appBar={AppBar}  dataProvider={dataProvider} basename="/admin" >
            {/* Define resources here */}
            <Resource
                name="Categories"
                list={CategoriesList}
                edit={CatergoryEdit}
                create={CategoryCreate}
                show={CategoryShow}
                icon={CategoryIcon}
            />

            <Resource
                name="Scores"
                list={ScoresList}
                show={ScoreShow}
                icon={ScoreIcon}
            />

            <Resource
                name="Questions"
                list={QuestionsList}
                edit={QuestionEdit}
                create={QuestionCreate}
                show={QuestionShow}
                icon={QuizIcon}
            />
        </Admin>
    )
}
