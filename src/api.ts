// API configuration for quiz questions service

import axios from "axios";

// Environment variables
const QUIZ_API_KEY = import.meta.env.VITE_QUIZ_API_KEY;
const LEADERBOARD_BASE_URL = import.meta.env.VITE_LEADERBOARD_BASE_URL;
const LEADERBOARD_APP_ID = import.meta.env.VITE_LEADERBOARD_APP_ID;
const LEADERBOARD_REST_API_KEY = import.meta.env.VITE_SCORE_REST_API_KEY;
const LEADERBOARD_OBJECT_ID = import.meta.env.VITE_LEADERBOARD_OBJECT_ID;

// Quiz API configuration
export const quizBaseUrl = "https://quizapi.io/api/v1/questions";

export const queryParams = {
    apiKey: QUIZ_API_KEY,
    limit: 20,
    difficulty: "Easy",
    multiple_correct_answers: "false"
};

// React Query cache configuration
export const gcTime = 1000 * 60 * 30; // 30 mins - how long to keep data in cache
export const staleTime = 1000 * 60 * 30; // 30 mins - how long data is considered fresh

// Quiz categories
export const categories = [
    "Linux",
    "Code", 
    "Docker",
    "nodeJS",
    "HTML",
    "SQL",
    "React",
    "DevOps",
    "BASH"
];

// Leaderboard API functions
export async function fetchScores() {
    return axios.get(`${LEADERBOARD_BASE_URL}/${LEADERBOARD_APP_ID}/${LEADERBOARD_REST_API_KEY}/data/quiz_app/${LEADERBOARD_OBJECT_ID}`)
        .then(response => response.data);
}

export async function sendScores(scoreData: string) {
    return axios.put(`${LEADERBOARD_BASE_URL}/${LEADERBOARD_APP_ID}/${LEADERBOARD_REST_API_KEY}/data/quiz_app/${LEADERBOARD_OBJECT_ID}`, {
        "score_data": scoreData
    }).then(response => response.data);
}
