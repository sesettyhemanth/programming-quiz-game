const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  icon: String,
  color: String,
  description: String,
  topics: [{
    name: String,
    description: String,
    subtopics: [String],
    isLocked: {
      type: Boolean,
      default: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  }],
  totalTopics: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Language', languageSchema);
