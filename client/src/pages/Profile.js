import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Profile({ user, onLogout }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/profile`);
      setProfile(response.data);
      setName(response.data.name);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/stats`);
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`${API_URL}/user/profile`, { name });
      setProfile({ ...profile, name });
      setEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
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
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold">Your Profile</h1>
          <button onClick={() => navigate('/')} className="btn-secondary text-gray-800">
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="card-shadow bg-white rounded-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
              {profile?.name?.[0]}
            </div>
            <div className="ml-6 flex-grow">
              {editing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />
                  <button onClick={handleUpdateProfile} className="btn-primary">
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setName(profile?.name);
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{profile?.name}</h2>
                  <p className="text-gray-600">{profile?.email}</p>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-blue-600 hover:text-blue-700 font-semibold mt-2"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-shadow bg-white rounded-lg p-6 text-center">
              <p className="text-gray-600 font-semibold mb-2">Total Points</p>
              <p className="text-4xl font-bold text-blue-600">{stats.totalPoints}</p>
            </div>
            <div className="card-shadow bg-white rounded-lg p-6 text-center">
              <p className="text-gray-600 font-semibold mb-2">Topics Completed</p>
              <p className="text-4xl font-bold text-green-600">{stats.completedTopics.length}</p>
            </div>
            <div className="card-shadow bg-white rounded-lg p-6 text-center">
              <p className="text-gray-600 font-semibold mb-2">Average Score</p>
              <p className="text-4xl font-bold text-purple-600">{stats.averageScore}%</p>
            </div>
          </div>
        )}

        {/* Completed Topics */}
        {stats?.completedTopics.length > 0 && (
          <div className="card-shadow bg-white rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6">Completed Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.completedTopics.map((topic, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                  <p className="font-semibold text-gray-800">{topic.language}</p>
                  <p className="text-sm text-gray-600">{topic.topic}</p>
                  <p className="text-sm text-green-700 font-semibold mt-2">Score: {topic.score}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
