# React Quiz App

A modern quiz application built with React 19 and TypeScript featuring real-time scoring, theme switching, and competitive leaderboards.

## Live Demo

🔗 **[View Live Application](https://daryl-react-vite-quiz-app.vercel.app/)**

## Features

- **Interactive Quiz Interface** - Multiple choice questions with instant feedback
- **Smart Scoring System** - Track performance across quiz attempts and categories
- **Global Leaderboard** - Compete with users worldwide by category
- **Dark/Light Theme** - Seamless theme switching with persistent preferences
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Real-time Data** - Live quiz questions from QuizAPI.io
- **Advanced Caching** - Fast loading with TanStack Query
- **Results Review** - Detailed feedback on incorrect answers
- **User Progress** - Persistent user data and score history

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
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

## API Configuration

1. Get your free API key from [QuizAPI.io](https://quizapi.io/)
2. Create a `.env` file in your project root
3. Create an account on [Backendless API](https://backendless.com/) and set up a database named `quiz_app` with a leaderboard record
   
4. Add your configuration:
   ```env
   VITE_QUIZ_API_KEY=your_api_key_here
   VITE_LEADERBOARD_BASE_URL=your_leaderboard_url
   VITE_LEADERBOARD_APP_ID=your_app_id
   VITE_SCORE_REST_API_KEY=your_rest_api_key
   VITE_LEADERBOARD_OBJECT_ID=your_object_id
   ```
5. Restart your development server


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

- **React 19** - Latest React with enhanced performance
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TanStack Query** - Powerful data fetching and caching
- **React Router** - Client-side routing
- **Material-UI** - Modern React components
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API calls

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Build for Production
```bash
npm run build
```

## Learning Opportunities

This project showcases modern React development patterns:

- **Modern React Hooks** - useState, useEffect, useContext, and custom hooks
- **TypeScript Integration** - Full type safety throughout the application
- **Context API** - Global state management for themes and user data
- **TanStack Query** - Advanced server state management and caching
- **React Router v7** - Modern SPA navigation patterns
- **Component Composition** - Reusable and maintainable UI components
- **API Integration** - External data fetching with error handling
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request


---

Happy coding!
