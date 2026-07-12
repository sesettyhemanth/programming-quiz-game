const express = require('express');
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get quiz by language and topic
router.get('/:language/:topic', async (req, res) => {
  try {
    const { language, topic } = req.params;
    const quiz = await Quiz.findOne({ language, topic });
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Return questions without answers for the quiz
    const quizData = {
      ...quiz.toObject(),
      questions: quiz.questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        difficulty: q.difficulty,
      })),
    };

    res.json(quizData);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get quiz answers (for review)
router.get('/:language/:topic/answers', auth, async (req, res) => {
  try {
    const { language, topic } = req.params;
    const quiz = await Quiz.findOne({ language, topic });
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz.questions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create quiz (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { language, topic, level, questions, timeLimit, passPercentage } = req.body;

    const quiz = new Quiz({
      language,
      topic,
      level,
      questions,
      totalQuestions: questions.length,
      timeLimit,
      passPercentage,
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
