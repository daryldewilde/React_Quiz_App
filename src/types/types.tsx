import type { ButtonProps } from "@mui/material";

export type LeaderboardData = Record<string, Score[]>;

// Button component props extending native button props
export interface ButtonComponentProps extends ButtonProps{
    text:string
}

export type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export type UserContextType = {
  user: string;
  setUser: (user: string) => void;
};

// Define the structure of a quiz question
export interface question {
    question_text: string;
    answer_options: string;
    correct_answer: string;
    objectId?: string;
}

export interface failedQuestion extends question {
    selectedAnswer: string;
}

// Define types for the leaderboard data
export interface Score {
    name: string;
    score: number;
    total_questions: number;
    objectId: string;
    category?: {
        name: string;
        objectId: string;
    }; 
}




