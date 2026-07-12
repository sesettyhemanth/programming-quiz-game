const mongoose = require('mongoose');
const Language = require('../models/Language');
const Quiz = require('../models/Quiz');
const quizData = require('../data/quizData');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-game', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out to keep existing data)
    // await Quiz.deleteMany({});
    // await Language.deleteMany({});
    // console.log('🗑️  Cleared existing data');

    // Seed languages
    const languagesToSeed = [
      {
        name: 'HTML',
        icon: '📄',
        color: 'from-orange-400 to-orange-600',
        description: 'Learn HTML - The foundation of web development',
        topics: [
          {
            name: 'HTML Basics',
            description: 'Learn HTML fundamentals and structure',
            subtopics: ['Tags', 'Elements', 'Attributes', 'Semantic HTML'],
            difficulty: 'beginner',
          },
          {
            name: 'Forms & Input',
            description: 'Master HTML forms and input controls',
            subtopics: ['Form Elements', 'Input Types', 'Validation', 'Form Submission'],
            difficulty: 'beginner',
          },
        ],
      },
      {
        name: 'CSS',
        icon: '🎨',
        color: 'from-blue-400 to-blue-600',
        description: 'Master CSS - Style your web pages beautifully',
        topics: [
          {
            name: 'CSS Basics',
            description: 'Learn CSS fundamentals',
            subtopics: ['Selectors', 'Properties', 'Box Model', 'Colors'],
            difficulty: 'beginner',
          },
          {
            name: 'Layouts & Flexbox',
            description: 'Create flexible and responsive layouts',
            subtopics: ['Flexbox', 'Grid', 'Positioning', 'Responsive Design'],
            difficulty: 'intermediate',
          },
        ],
      },
      {
        name: 'JavaScript',
        icon: '⚡',
        color: 'from-yellow-400 to-yellow-600',
        description: 'Master JavaScript - Make your web pages interactive',
        topics: [
          {
            name: 'JS Basics',
            description: 'Learn JavaScript fundamentals',
            subtopics: ['Variables', 'Data Types', 'Operators', 'Control Flow'],
            difficulty: 'beginner',
          },
          {
            name: 'Arrays & Objects',
            description: 'Work with complex data structures',
            subtopics: ['Arrays', 'Objects', 'Methods', 'Manipulation'],
            difficulty: 'intermediate',
          },
        ],
      },
      {
        name: 'Python',
        icon: '🐍',
        color: 'from-green-400 to-green-600',
        description: 'Learn Python - Versatile programming language',
        topics: [
          {
            name: 'Python Basics',
            description: 'Learn Python fundamentals',
            subtopics: ['Variables', 'Data Types', 'Operators', 'Functions'],
            difficulty: 'beginner',
          },
          {
            name: 'Control Flow',
            description: 'Master control structures',
            subtopics: ['If-Else', 'Loops', 'Break & Continue', 'Exception Handling'],
            difficulty: 'intermediate',
          },
        ],
      },
      {
        name: 'Java',
        icon: '☕',
        color: 'from-red-400 to-red-600',
        description: 'Master Java - Enterprise programming',
        topics: [
          {
            name: 'Java Basics',
            description: 'Learn Java fundamentals',
            subtopics: ['Variables', 'Data Types', 'Classes', 'Objects'],
            difficulty: 'beginner',
          },
        ],
      },
    ];

    // Upsert languages
    for (const lang of languagesToSeed) {
      const existingLang = await Language.findOne({ name: lang.name });
      if (!existingLang) {
        await Language.create({
          ...lang,
          totalTopics: lang.topics.length,
        });
        console.log(`✅ Seeded language: ${lang.name}`);
      } else {
        console.log(`⏭️  Language ${lang.name} already exists, skipping...`);
      }
    }

    // Seed quizzes
    const languagesInData = Object.keys(quizData);

    for (const language of languagesInData) {
      const topics = quizData[language].topics;

      for (const topic of topics) {
        const existingQuiz = await Quiz.findOne({
          language,
          topic: topic.name,
        });

        if (!existingQuiz) {
          await Quiz.create({
            language,
            topic: topic.name,
            level: 'beginner',
            questions: topic.questions,
            totalQuestions: topic.questions.length,
            timeLimit: 60,
            passPercentage: 60,
          });
          console.log(`✅ Seeded quiz: ${language} - ${topic.name}`);
        } else {
          console.log(
            `⏭️  Quiz ${language} - ${topic.name} already exists, skipping...`
          );
        }
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
