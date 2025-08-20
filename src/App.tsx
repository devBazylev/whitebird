import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ForumProvider } from './context/ForumContext';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

function App() {
  return (
    <ForumProvider>
      <Router basename="/whitebird">
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ForumProvider>
  );
}

export default App;
