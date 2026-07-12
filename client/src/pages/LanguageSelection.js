import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const LANGUAGES = [
  { name: 'HTML', icon: '📄', color: 'from-orange-400 to-orange-600' },
  { name: 'CSS', icon: '🎨', color: 'from-blue-400 to-blue-600' },
  { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Python', icon: '🐍', color: 'from-green-400 to-green-600' },
  { name: 'Java', icon: '☕', color: 'from-red-400 to-red-600' },
  { name: 'C', icon: '⚙️', color: 'from-purple-400 to-purple-600' },
  { name: 'C++', icon: '⚙️', color: 'from-pink-400 to-pink-600' },
  { name: 'C#', icon: '📊', color: 'from-indigo-400 to-indigo-600' },
  { name: 'PHP', icon: '🐘', color: 'from-indigo-400 to-indigo-600' },
  { name: 'SQL', icon: '🗄️', color: 'from-teal-400 to-teal-600' },
  { name: 'MySQL', icon: '🗄️', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Node.js', icon: '🟩', color: 'from-green-400 to-green-600' },
  { name: 'React', icon: '⚛️', color: 'from-blue-400 to-blue-600' },
  { name: 'Angular', icon: '🔴', color: 'from-red-400 to-red-600' },
  { name: 'OOPs', icon: '🏗️', color: 'from-amber-400 to-amber-600' },
  { name: 'DBMS', icon: '🗂️', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Git', icon: '🌳', color: 'from-orange-400 to-orange-600' },
  { name: 'GitHub', icon: '🐙', color: 'from-gray-600 to-gray-800' },
];

function LanguageSelection({ user }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLanguages = LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (language) => {
    navigate(`/learning/${language.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Choose Your Path 🎯</h1>
          <p className="text-lg opacity-90">Select a programming language to start your learning journey</p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field max-w-md"
          />
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLanguages.map((language) => (
            <div
              key={language.name}
              onClick={() => handleLanguageSelect(language)}
              className="card-shadow bg-white rounded-lg p-6 cursor-pointer transform transition-all hover:scale-105"
            >
              <div className={`bg-gradient-to-br ${language.color} rounded-lg p-6 text-center mb-4`}>
                <span className="text-5xl">{language.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800">{language.name}</h3>
              <p className="text-sm text-gray-600 text-center mt-2">Master {language.name} concepts</p>
            </div>
          ))}
        </div>

        {filteredLanguages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No languages found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSelection;
