# React Quiz App

A simple and beginner-friendly quiz application built with React and TypeScript.

## Features

- 📝 Interactive quiz questions
- 🎯 Multiple choice answers
- 📊 Score tracking
- 🌙 Dark/Light theme
- 📱 Works on mobile and desktop
- 🌐 Can use external API questions (optional)

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the app:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   Go to [http://localhost:3000](http://localhost:3000)

## Want to Use External Quiz Questions? (Optional)

By default, the app uses local quiz data. If you want to get questions from an external API:

1. Go to [QuizAPI.io](https://quizapi.io/) and create a free account
2. Get your API key from the dashboard
3. Create a file called `.env.local` in your project root
4. Add this line: `REACT_APP_QUIZ_API_KEY=your_api_key_here`
5. Restart your app

**No API key? No problem!** The app works perfectly without it.

## How It Works

- **Home Page**: Enter your username
- **Subjects**: Pick a quiz category
- **Quiz**: Answer questions and get scored
- **Results**: See your score and go to leaderboard
- **Leaderboard**: View all scores

## Project Structure

```
src/
├── components/     # UI components (buttons, forms, etc.)
├── pages/         # Main pages (home, quiz, results)
├── contexts/      # App-wide state (theme, user)
├── types/         # TypeScript definitions
└── mockData.js    # Local quiz questions
```

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios (for API calls)

## Development

To build for production:
```bash
npm run build
```

## Learn More

This is a great project for learning:
- React hooks (useState, useEffect, useContext)
- TypeScript basics
- API integration
- Local storage
- Responsive design

Happy coding! 🚀
