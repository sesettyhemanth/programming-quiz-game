import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/user/leaderboard`);
      setLeaderboard(response.data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return `#${rank + 1}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold">🏆 Leaderboard</h1>
          <button onClick={() => navigate('/')} className="btn-secondary text-gray-800">
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Top 3 */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* 2nd Place */}
            <div className="card-shadow bg-white rounded-lg p-6 border-t-4 border-gray-400 text-center">
              <div className="text-4xl mb-4">🥈</div>
              <div className="w-16 h-16 rounded-full bg-gray-400 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {leaderboard[1]?.name?.[0]}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{leaderboard[1]?.name}</h3>
              <p className="text-3xl font-bold text-gray-600 mt-4">{leaderboard[1]?.totalPoints}</p>
              <p className="text-sm text-gray-600">Points</p>
            </div>

            {/* 1st Place */}
            <div className="card-shadow bg-white rounded-lg p-6 border-t-4 border-yellow-500 text-center transform scale-105">
              <div className="text-5xl mb-4">🥇</div>
              <div className="w-16 h-16 rounded-full bg-yellow-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {leaderboard[0]?.name?.[0]}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{leaderboard[0]?.name}</h3>
              <p className="text-4xl font-bold text-yellow-600 mt-4">{leaderboard[0]?.totalPoints}</p>
              <p className="text-sm text-gray-600">Points</p>
            </div>

            {/* 3rd Place */}
            <div className="card-shadow bg-white rounded-lg p-6 border-t-4 border-orange-600 text-center">
              <div className="text-4xl mb-4">🥉</div>
              <div className="w-16 h-16 rounded-full bg-orange-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {leaderboard[2]?.name?.[0]}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{leaderboard[2]?.name}</h3>
              <p className="text-3xl font-bold text-orange-600 mt-4">{leaderboard[2]?.totalPoints}</p>
              <p className="text-sm text-gray-600">Points</p>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Points</th>
                  <th className="px-6 py-4 text-left font-semibold">Topics Completed</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-lg">
                      {getMedalEmoji(index)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold mr-3">
                          {user.name?.[0]}
                        </div>
                        <span className="font-semibold text-gray-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-blue-600">{user.totalPoints}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {user.completedTopics?.length || 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
