import { useNavigate, Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import GamePage from './Components/GamePage/GamePage'
import './App.css';

function App() {

  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Landing navigate={navigate} />} />
      <Route path="/play" element={<GamePage navigate={navigate} />} />  
    </Routes>
  );
}

export default App;
