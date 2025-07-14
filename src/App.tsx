import './styles/App.css';
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/leaderboard' element={<Leaderboard />} />
                    <Route path='/quiz' element={<Quiz />} />
                    <Route path='/result' element={<Result />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;
