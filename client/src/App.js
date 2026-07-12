import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LanguageSelection from './pages/LanguageSelection';
import LearningPath from './pages/LearningPath';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/auth/me`);
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard user={user} onLogout={handleLogout} />} />
            <Route path="/languages" element={<LanguageSelection user={user} />} />
            <Route path="/learning/:language" element={<LearningPath user={user} />} />
            <Route path="/quiz/:language/:topic" element={<Quiz user={user} />} />
            <Route path="/results/:resultId" element={<Results user={user} />} />
            <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
