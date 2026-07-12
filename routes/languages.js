const express = require('express');
const Language = require('../models/Language');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all languages
router.get('/', async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get language by name
router.get('/:name', async (req, res) => {
  try {
    const language = await Language.findOne({ name: req.params.name });
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    res.json(language);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create language (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, icon, color, description, topics } = req.body;

    const language = new Language({
      name,
      icon,
      color,
      description,
      topics,
      totalTopics: topics?.length || 0,
    });

    await language.save();
    res.status(201).json(language);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
