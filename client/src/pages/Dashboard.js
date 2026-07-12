import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Dashboard({ user, onLogout }) {
  const [stats, setStats] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchRecentQuizzes();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/stats`);
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const fetchRecentQuizzes = async () => {
    try {
      const response = await axios.get(`${API_URL}/results/user/history`);
      setRecentQuizzes(response.data.slice(0, 5));
    } catch (err) {
      console.error('Error fetching quizzes:', err);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
            Quiz Master
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-semibold">{user?.name}</span>
            <Link to="/profile" className="text-blue-600 hover:text-blue-700">Profile</Link>
            <Link to="/leaderboard" className="text-blue-600 hover:text-blue-700">Leaderboard</Link>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 🎯</h2>
          <p>Continue your journey to master programming languages and technologies.</p>
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-shadow bg-white rounded-lg p-6 text-center">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Points</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalPoints}</p>
            </div>
            <div className="card-shadow bg-white rounded-lg p-6 text-center">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Topics Completed</h3>
              <p className="text-3xl font-bold text-green-600">{stats.completedTopics}</p>
            </div>
            <div className="card-shadow bg-white rounded-lg p-6 text-center">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Quizzes Attempted</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.attemptedQuizzes}</p>
            </div>
            <div className="card-shadow bg-white rounded-lg p-6 text-center">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Average Score</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.averageScore}%</p>
            </div>
          </div>
        )}

        {/* Action Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">Start Learning</h3>
          <button
            onClick={() => navigate('/languages')}
            className="btn-primary"
          >
            Choose Programming Language →
          </button>
        </div>

        {/* Recent Quizzes */}
        {recentQuizzes.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-4">Recent Quiz Attempts</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Language</th>
                    <th className="px-4 py-2 text-left">Topic</th>
                    <th className="px-4 py-2 text-left">Score</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQuizzes.map((quiz, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{quiz.language}</td>
                      <td className="px-4 py-2">{quiz.topic}</td>
                      <td className="px-4 py-2 font-bold">{quiz.score}%</td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          quiz.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {quiz.passed ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-4 py-2">{new Date(quiz.completedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
