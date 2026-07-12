import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Results({ user }) {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  useEffect(() => {
    fetchResult();
  }, [resultId]);

  const fetchResult = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/results/${resultId}`);
      setResult(response.data);

      // Fetch quiz data for explanations
      const quizResponse = await axios.get(
        `${API_URL}/quiz/${response.data.language}/${response.data.topic}/answers`
      );
      setQuizData(quizResponse.data);
    } catch (err) {
      console.error('Error fetching result:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mb-4"></div>
          <p className="text-gray-700 text-lg">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Quiz Complete! 🎉</h1>
          <p className="text-lg opacity-90">Here's how you performed</p>
        </div>
      </div>

      {/* Results Summary */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`card-shadow rounded-lg p-8 mb-8 border-l-8 ${
          result.passed
            ? 'border-green-500 bg-white'
            : 'border-red-500 bg-white'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Score */}
            <div className="text-center">
              <div className={`text-5xl font-bold ${getScoreColor(result.score)} mb-2`}>
                {result.score}%
              </div>
              <p className="text-gray-600">Your Score</p>
            </div>

            {/* Accuracy */}
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {result.accuracy}%
              </div>
              <p className="text-gray-600">Accuracy</p>
            </div>

            {/* Correct Answers */}
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {result.correctAnswers}/{result.totalQuestions}
              </div>
              <p className="text-gray-600">Correct Answers</p>
            </div>

            {/* Time */}
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                {Math.floor(result.totalTime / 60)}:{String(result.totalTime % 60).padStart(2, '0')}
              </div>
              <p className="text-gray-600">Time Taken</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <div>
              {result.passed ? (
                <div className="inline-flex items-center">
                  <span className="text-2xl mr-3">✅</span>
                  <div>
                    <p className="text-xl font-bold text-green-700">Congratulations!</p>
                    <p className="text-gray-600">You passed the quiz with flying colors!</p>
                  </div>
                </div>
              ) : (
                <div className="inline-flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  <div>
                    <p className="text-xl font-bold text-orange-700">Keep Learning!</p>
                    <p className="text-gray-600">Review the material and try again.</p>
                  </div>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Points Earned</p>
              <p className="text-3xl font-bold text-orange-600">+{result.score}</p>
            </div>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Answer Review</h2>
          <div className="space-y-4">
            {result.answers.map((answer, index) => {
              const question = quizData?.[index];
              return (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                    className={`w-full p-4 text-left flex items-center justify-between transition-colors ${
                      answer.isCorrect
                        ? 'bg-green-50 hover:bg-green-100'
                        : 'bg-red-50 hover:bg-red-100'
                    }`}
                  >
                    <div className="flex items-center flex-grow">
                      <span className={`text-2xl mr-4 ${
                        answer.isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {answer.isCorrect ? '✓' : '✗'}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800">Question {index + 1}</p>
                        <p className="text-sm text-gray-600">{question?.question}</p>
                      </div>
                    </div>
                    <span className="text-gray-600">
                      {expandedQuestion === index ? '▼' : '▶'}
                    </span>
                  </button>

                  {expandedQuestion === index && (
                    <div className="p-4 border-t">
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Your Answer:</p>
                        <p className={`p-3 rounded text-sm ${
                          answer.isCorrect
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {answer.userAnswer}
                        </p>
                      </div>

                      {!answer.isCorrect && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Correct Answer:</p>
                          <p className="p-3 rounded text-sm bg-green-100 text-green-800">
                            {answer.correctAnswer}
                          </p>
                        </div>
                      )}

                      {question?.explanation && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">Explanation:</p>
                          <p className="p-3 rounded text-sm bg-blue-50 text-blue-900">
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Back to Dashboard
          </button>
          {!result.passed && (
            <button
              onClick={() => navigate(`/quiz/${result.language}/${result.topic}`)}
              className="btn-primary"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;
