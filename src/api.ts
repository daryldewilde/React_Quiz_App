// API configuration for quiz app

import axios from "axios";
import { getRandomElements } from "./utils/utils";
import type { question } from "./types/types";


const BASE_URL = import.meta.env.VITE_BASE_URL
const BACKENDLESS_APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID
const BACKENDLESS_REST_API_KEY = import.meta.env.VITE_BACKENDLESS_REST_API_KEY;
const DATA_PAGE_SIZE_LIMIT = 100; // Default page size for data fetching
const QUESTIONS_LIMIT = 20; // Default limit for questions
const FULL_BASE_URL = `${BASE_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_API_KEY}`;


// --- QUESTIONS ---
export const getAllQuestionsByCategory = async (category:string):Promise<question[]> => {
  const res = await axios.get(`${FULL_BASE_URL}/data/Questions?pageSize=${DATA_PAGE_SIZE_LIMIT}&where=category.name='${category}'`);
  console.log("Fetched Questions:", res.data);
  return getRandomElements(res.data, QUESTIONS_LIMIT);
};

export const getQuestionById = async (id: string) => {
  const res = await axios.get(`${FULL_BASE_URL}/data/Questions/${id}`);
  return res.data;
};

// --- CATEGORIES ---
export const getAllCategories = async () => {
  const res = await axios.get(`${FULL_BASE_URL}/data/Categories?pageSize=${DATA_PAGE_SIZE_LIMIT}`);
  return res.data;
};

export const getCategoryById = async (id: string) => {
  const res = await axios.get(`${FULL_BASE_URL}/data/Categories/${id}`);
  return res.data;
};

export const getCategoryByName = async (name: string) => {
  const res = await axios.get(`${FULL_BASE_URL}/data/Categories?where=name='${name}'`);
  return res.data;
};

// --- SCORES (LEADERBOARD) ---
export const getAllScores = async () => {
  const res = await axios.get(`${FULL_BASE_URL}/data/Scores?loadRelations=category&pageSize=${DATA_PAGE_SIZE_LIMIT}`);
  return res.data;
};

export const createScore = async (scoreObj: { name: string; score: number; total_questions: number; category?: string }) => {
  const res = await axios.post(`${FULL_BASE_URL}/data/Scores`, scoreObj);
  return res.data;
};

export const getScoreById = async (id: string) => {
  const res = await axios.get(`${FULL_BASE_URL}/data/Scores/${id}`);
  return res.data;
};

// --- UTILITY ---
export const linkScoreToCategory = async (scoreId: string, categoryId: string) => {
  const res = await axios.post(`${FULL_BASE_URL}/data/Scores/${scoreId}/Category`, [categoryId]);
  return res.data;
};




/*
// Environment variables
const QUIZ_API_KEY = import.meta.env.VITE_QUIZ_API_KEY;
const LEADERBOARD_FULL_BASE_URL = import.meta.env.VITE_LEADERBOARD_FULL_BASE_URL;
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
    return axios.get(`${LEADERBOARD_FULL_BASE_URL}/${LEADERBOARD_APP_ID}/${LEADERBOARD_REST_API_KEY}/data/quiz_app/${LEADERBOARD_OBJECT_ID}`)
        .then(response => response.data);
}

export async function sendScores(scoreData: string) {
    return axios.put(`${LEADERBOARD_FULL_BASE_URL}/${LEADERBOARD_APP_ID}/${LEADERBOARD_REST_API_KEY}/data/quiz_app/${LEADERBOARD_OBJECT_ID}`, {
        "score_data": scoreData
    }).then(response => response.data);
}


*/

