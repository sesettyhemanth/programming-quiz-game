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

    // Get quiz to get correct answers
    const quiz = await Quiz.findOne({ language, topic });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let correctCount = 0;
    const processedAnswers = answers.map((answer, index) => {
      const question = quiz.questions[index];
      const isCorrect = answer === question.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        questionId: question.id,
        userAnswer: answer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        timeTaken: Math.floor(totalTime / quiz.questions.length),
      };
    });

    const accuracy = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = accuracy >= quiz.passPercentage;
    const score = accuracy;

    // Create result
    const result = new Result({
      userId: req.userId,
      quizId: quiz._id,
      language,
      topic,
      answers: processedAnswers,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: quiz.questions.length - correctCount,
      accuracy,
      score,
      totalTime,
      passed,
    });

    await result.save();

    // Update user statistics
    const user = await User.findById(req.userId);
    user.totalPoints += score;

    // Add to attempted quizzes
    user.attemptedQuizzes.push({
      quizId: quiz._id,
      language,
      topic,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      attemptedAt: new Date(),
    });

    // Add to completed topics if passed
    if (passed) {
      const alreadyCompleted = user.completedTopics.some(
        (t) => t.language === language && t.topic === topic
      );
      if (!alreadyCompleted) {
        user.completedTopics.push({
          language,
          topic,
          completedAt: new Date(),
          score,
        });
      }
    }

    await user.save();

    res.status(201).json({
      message: 'Quiz submitted successfully',
      result: {
        ...result.toObject(),
        passed,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get specific result
router.get('/:resultId', async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user's quiz history
router.get('/user/history', auth, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.userId })
      .sort({ completedAt: -1 })
      .limit(10);

    const formattedResults = results.map((r) => ({
      language: r.language,
      topic: r.topic,
      score: r.score,
      totalQuestions: r.totalQuestions,
      correctAnswers: r.correctAnswers,
      passed: r.passed,
      completedAt: r.completedAt,
    }));

    res.json(formattedResults);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
