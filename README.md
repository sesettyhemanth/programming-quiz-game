# Programming Quiz Game

🎮 An interactive programming quiz game with gamified learning paths to help developers master multiple programming languages and technologies.

## Features

✨ **Gamified Learning Path**
- Progressive learning from beginner to advanced
- Unlock topics by completing prerequisites
- Earn points and track progress

📚 **30+ Programming Languages & Technologies**
- HTML, CSS, JavaScript
- Python, Java, C, C++, C#
- PHP, SQL, MySQL
- Node.js, React, Angular
- OOPs, DBMS, Git, GitHub
- And many more...

🎯 **Interactive Quizzes**
- 10-20 questions per topic
- Real-time timer
- Step-by-step answer review
- Difficulty levels (Easy, Medium, Hard)

📊 **User Features**
- Email & Google OAuth authentication
- User profile with statistics
- Track completed topics and quiz attempts
- Leaderboard to compete with others
- Dashboard with performance overview

🔐 **Secure & Fast**
- JWT authentication
- MongoDB database
- Express.js REST API
- React frontend with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sesettyhemanth/programming-quiz-game.git
cd programming-quiz-game
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quiz-game
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

5. **Start MongoDB**
```bash
mongod
```

6. **Run the application**

**Terminal 1 - Backend**
```bash
npm run dev
```

**Terminal 2 - Frontend**
```bash
npm run client
```

The application will be available at `http://localhost:3000`

## Project Structure

```
programming-quiz-game/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── routes/                # API routes
│   ├── auth.js
│   ├── quiz.js
│   ├── languages.js
│   ├── user.js
│   └── results.js
├── models/               # MongoDB schemas
│   ├── User.js
│   ├── Quiz.js
│   ├── Language.js
│   └── Result.js
├── middleware/           # Express middleware
│   └── auth.js
├── data/                 # Quiz data
│   └── quizData.js
├── server.js            # Main server file
├── package.json
└── .env.example
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google-login` - Google OAuth login
- `GET /api/auth/me` - Get current user

### Languages
- `GET /api/languages` - Get all languages
- `GET /api/languages/:name` - Get language by name

### Quizzes
- `GET /api/quiz` - Get all quizzes
- `GET /api/quiz/:language/:topic` - Get quiz questions
- `POST /api/quiz` - Create new quiz (admin)

### Results
- `POST /api/results` - Submit quiz results
- `GET /api/results/user/history` - Get user's quiz history
- `GET /api/results/:resultId` - Get specific result

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/stats` - Get user statistics
- `GET /api/user/leaderboard` - Get leaderboard

## Features in Detail

### Dashboard
- View total points and progress
- See recent quiz attempts
- Quick access to learning paths

### Learning Path
- Sequential learning modules
- Locked topics until prerequisites are completed
- Visual progress tracker

### Quiz Interface
- Real-time countdown timer
- Question navigator for quick navigation
- Save answers as you go
- Difficulty indicators

### Results & Review
- Detailed score breakdown
- Accuracy percentage
- Time taken analysis
- Complete answer review with explanations
- Option to retake failed quizzes

### Leaderboard
- Global rankings by points
- User achievements
- Topics completed tracker
- Real-time updates

## Quiz Data

The application includes comprehensive quiz data for:

- **HTML**: Basics, Forms, Semantic HTML, Accessibility
- **CSS**: Basics, Flexbox, Grid, Animations
- **JavaScript**: Basics, Arrays/Objects, Functions, Async
- **Python**: Basics, Control Flow, Functions, OOP
- **Java**: Basics, OOP, Collections, Exception Handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For support, email sesettihemanth123@gmail.com or open an issue on GitHub.

## Authors

- **sesettyhemanth** - Initial work

## Acknowledgments

- Built with React, Express, and MongoDB
- Styled with Tailwind CSS
- Inspired by modern gamified learning platforms
