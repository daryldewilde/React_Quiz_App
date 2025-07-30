import './App.css';
import AdminInterface from './AdminInterface';
import Custom404 from './pages/Custom404';
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Categories from './pages/Categories';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Main App component with routing configuration
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home page - user login/entry point */}
                <Route path='/' element={<Home />}/>
                
                {/* Leaderboard page - shows quiz results */}
                <Route path='/leaderboard' element={<Leaderboard />} />
                
                {/* Quiz page - dynamic route for different categories */}
                <Route path='/quiz/:category' element={<Quiz />} />
                
                {/* Result page - shows quiz completion results */}
                <Route path='/result' element={<Result />} />
                
                {/* Subjects page - category selection */}
                <Route path='/subjects' element={<Categories />} />

                 {/* Admin pages for react admin */}
                <Route path='/admin/*' element={<AdminInterface />} />

                {/*Back to home page in case of url mismatch */}
                <Route path='*' element={<Custom404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
