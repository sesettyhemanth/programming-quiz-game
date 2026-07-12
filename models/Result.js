const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  language: String,
  topic: String,
  answers: [{
    questionId: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    timeTaken: Number, // in seconds
  }],
  totalQuestions: Number,
  correctAnswers: Number,
  incorrectAnswers: Number,
  accuracy: Number, // percentage
  score: Number,
  totalTime: Number, // in seconds
  passed: Boolean,
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Result', resultSchema);
