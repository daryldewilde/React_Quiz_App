# React Quiz App

A quiz application built with React and TypeScript that includes scoring, theme switching, and leaderboard functionality.

## Live Demo

🔗 **[View Live Application](https://daryl-react-quiz.vercel.app/)**

## Features

- **Interactive Quiz Interface** - Multiple choice questions with feedback
- **Scoring System** - Track performance across quiz attempts
- **Leaderboard** - Compare scores with other users by category
- **Theme Toggle** - Switch between dark and light modes
- **Responsive Design** - Works on mobile, tablet, and desktop devices
- **API Integration** - Fetches questions from QuizAPI.io
- **React Query** - Data fetching with caching
- **Local Storage** - Persistent user data and scores
- **Material-UI Components** - UI component library
- **Results Review** - View correct answers for missed questions

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/daryldewilde/React_Quiz_App.git
   cd react_quiz_app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Configuration

1. Go to [QuizAPI.io](https://quizapi.io/) and create a free account
2. Get your API key from the dashboard
3. Create a file called `.env` in your project root
4. Add this line: `REACT_APP_QUIZ_API_KEY=your_api_key_here`
5. Restart your app

**No API key? No problem!** The app works perfectly without it.

## How It Works

1. **Home Page** - Enter your username to get started
2. **Category Selection** - Choose from various quiz categories or select random
3. **Quiz Interface** - Answer multiple choice questions with real-time feedback
4. **Results Page** - View your score and review correct answers for missed questions
5. **Leaderboard** - Compare your performance with other users across categories

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Button.tsx     # Custom button component
│   ├── Header.tsx     # App header with theme toggle
│   ├── Footer.tsx     # App footer
│   ├── Main.tsx       # Main layout wrapper
│   ├── CategorySelect.tsx
│   └── UsernameForm.tsx
├── pages/             # Main application pages
│   ├── Home.tsx       # Landing page
│   ├── Subjects.tsx   # Category selection
│   ├── Quiz.tsx       # Quiz interface
│   ├── Result.tsx     # Results display
│   └── Leaderboard.tsx
├── contexts/          # React Context providers
│   ├── theme.tsx      # Theme management
│   └── user.tsx       # User state management
├── hooks/             # Custom React hooks
│   ├── useThemeContext.tsx
│   └── useUserContext.tsx
├── types/             # TypeScript type definitions
│   └── types.tsx
├── api.ts            # API configuration
└── styles/           # Global styles
    └── App.css
```

## Technologies Used

- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **React Router** - Declarative routing for React
- **React Query** - Data fetching and state management
- **Material-UI** - React component library
- **Tailwind CSS** - Utility-first CSS framework
- **QuizAPI.io** - External quiz questions API

## Development

### Build for Production
```bash
npm run build
```


### Available Scripts
- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production

## Learning Opportunities

This project demonstrates common React development patterns:

- **React Hooks** - useState, useEffect, useContext, and custom hooks
- **TypeScript Integration** - Type safety in React applications
- **Context API** - State management for theme and user data
- **React Router** - Single page application navigation
- **React Query** - Server state management and caching
- **Material-UI** - Integration with component libraries
- **Local Storage** - Client-side data persistence
- **Responsive Design** - Mobile-friendly layouts with Tailwind CSS
- **API Integration** - External data fetching and error handling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request


---

Happy coding!
