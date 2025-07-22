import { ComponentProps } from "react";

// Button component props extending native button props
export interface ButtonComponentProps extends ComponentProps<"button"> {
    text:string
}

// Define the structure of a quiz question
export interface question{
    answers:{[key:string]:string},
    correct_answers:{[key:string]:string},
    question:string
}

export type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export type UserContextType = {
  user: string;
  setUser: (user: string) => void;
};

// Define types for the leaderboard data
export interface Score {
    name: string;
    score: number;
    totalQuestions: number; 
}

export interface LeaderboardData {
    [key: string]: Score[];
}

