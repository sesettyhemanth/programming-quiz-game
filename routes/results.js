const express = require('express');
const Result = require('../models/Result');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Submit quiz result
router.post('/', auth, async (req, res) => {
  try {
    const { quizId, language, topic, answers, totalTime } = req.body;
    const userId = req.userId;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let correctAnswers = 0;
    let incorrectAnswers = 0;

    const processedAnswers = answers.map((answer, index) => {
      const question = quiz.questions[index];
      const isCorrect = answer.userAnswer === question.correctAnswer;
      
      if (isCorrect) correctAnswers++;
      else incorrectAnswers++;

      return {
        questionId: question.id,
        userAnswer: answer.userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        timeTaken: answer.timeTaken,
      };
    });

    const accuracy = (correctAnswers / quiz.totalQuestions) * 100;
    const score = Math.round((correctAnswers / quiz.totalQuestions) * 100);
    const passed = score >= quiz.passPercentage;

    const result = new Result({
      userId,
      quizId,
      language,
      topic,
      answers: processedAnswers,
      totalQuestions: quiz.totalQuestions,
      correctAnswers,
      incorrectAnswers,
      accuracy: Math.round(accuracy),
      score,
      totalTime,
      passed,
    });

    await result.save();

    // Update user stats
    const user = await User.findById(userId);
    const pointsEarned = score;
    user.totalPoints += pointsEarned;

    // Check if topic is completed
    const topicCompleted = user.completedTopics.find(
      t => t.language === language && t.topic === topic
    );
    
    if (!topicCompleted && passed) {
      user.completedTopics.push({
        language,
        topic,
        completedAt: new Date(),
        score,
      });
    }

    user.attemptedQuizzes.push({
      quizId,
      language,
      topic,
      score,
      totalQuestions: quiz.totalQuestions,
      correctAnswers,
      attemptedAt: new Date(),
    });

    await user.save();

    res.status(201).json({
      result: {
        ...result.toObject(),
        pointsEarned,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user results
router.get('/user/history', auth, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.userId })
      .sort({ completedAt: -1 })
      .populate('quizId');
    
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get result by ID
router.get('/:resultId', auth, async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId);
    
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    if (result.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
