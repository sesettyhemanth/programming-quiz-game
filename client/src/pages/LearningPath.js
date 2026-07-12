import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const TOPICS_BY_LANGUAGE = {
  'HTML': ['HTML Basics', 'Forms & Input', 'Semantic HTML', 'Accessibility'],
  'CSS': ['CSS Basics', 'Layouts & Flexbox', 'Grid & Positioning', 'Animations'],
  'JavaScript': ['JS Basics', 'Arrays & Objects', 'Functions & Scope', 'Async & Await'],
  'Python': ['Python Basics', 'Control Flow', 'Functions & Modules', 'OOP Concepts'],
  'Java': ['Java Basics', 'OOP Fundamentals', 'Collections & Streams', 'Exception Handling'],
};

function LearningPath({ user }) {
  const { language } = useParams();
  const navigate = useNavigate();
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    if (user?.completedTopics) {
      setCompletedTopics(
        user.completedTopics
          .filter(t => t.language === language)
          .map(t => t.topic)
      );
    }
  }, [user, language]);

  const topics = TOPICS_BY_LANGUAGE[language] || [];

  const handleTopicClick = (topicIndex) => {
    if (topicIndex === 0 || completedTopics.includes(topics[topicIndex - 1])) {
      navigate(`/quiz/${language}/${topics[topicIndex]}`);
    }
  };

  const isTopicLocked = (topicIndex) => {
    return topicIndex > 0 && !completedTopics.includes(topics[topicIndex - 1]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/languages')}
            className="mb-4 text-blue-100 hover:text-white"
          >
            ← Back to Languages
          </button>
          <h1 className="text-4xl font-bold mb-2">{language} Learning Path</h1>
          <p className="text-lg opacity-90">Complete topics in sequence to unlock advanced levels</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-700 h-4 rounded-full transition-all"
              style={{ width: `${(completedTopics.length / topics.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-600 mt-2">
            {completedTopics.length} of {topics.length} topics completed
          </p>
        </div>

        {/* Topics Road Map */}
        <div className="space-y-6">
          {topics.map((topic, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < topics.length - 1 && (
                <div className="absolute left-8 top-24 w-1 h-12 bg-gradient-to-b from-blue-400 to-purple-400 hidden md:block"></div>
              )}

              {/* Topic Card */}
              <div
                onClick={() => handleTopicClick(index)}
                className={`card-shadow rounded-lg p-6 ${
                  isTopicLocked(index)
                    ? 'bg-gray-100 cursor-not-allowed opacity-50'
                    : 'bg-white cursor-pointer hover:shadow-lg'
                }`}
              >
                <div className="flex items-start">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center mr-6 text-2xl ${
                    completedTopics.includes(topic)
                      ? 'bg-green-100 text-green-600'
                      : isTopicLocked(index)
                      ? 'bg-gray-300 text-gray-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {completedTopics.includes(topic) ? '✓' : isTopicLocked(index) ? '🔒' : index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800">{topic}</h3>
                    <p className="text-gray-600 mt-2">10-20 questions to test your knowledge</p>
                    {completedTopics.includes(topic) && (
                      <div className="mt-3">
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          ✓ Completed
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  {!isTopicLocked(index) && (
                    <div className="text-blue-600 text-2xl">→</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningPath;
