const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, profilePicture } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, profilePicture, updatedAt: new Date() },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    const stats = {
      totalPoints: user.totalPoints,
      completedTopics: user.completedTopics.length,
      attemptedQuizzes: user.attemptedQuizzes.length,
      averageScore: user.attemptedQuizzes.length > 0
        ? Math.round(
            user.attemptedQuizzes.reduce((sum, q) => sum + q.score, 0) / user.attemptedQuizzes.length
          )
        : 0,
      completedTopics: user.completedTopics,
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find()
      .sort({ totalPoints: -1 })
      .limit(100)
      .select('name totalPoints profilePicture completedTopics');

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
