const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  questions: [{
    id: String,
    question: String,
    options: [String],
    correctAnswer: String,
    explanation: String,
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
  }],
  totalQuestions: Number,
  timeLimit: {
    type: Number,
    default: 60, // seconds per question
  },
  passPercentage: {
    type: Number,
    default: 60,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quiz', quizSchema);
