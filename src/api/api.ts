// API configuration for quiz app

import axios from "axios";
import { getRandomElements } from "../utils/utils";
import type { question } from "../types/types";


const BASE_URL = import.meta.env.VITE_BASE_URL
const BACKENDLESS_APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID
const BACKENDLESS_REST_API_KEY = import.meta.env.VITE_BACKENDLESS_REST_API_KEY;
const DATA_PAGE_SIZE_LIMIT = 100; // Default page size for data fetching
const QUESTIONS_LIMIT = 20; // Default limit for questions

export const FULL_BASE_URL = `${BASE_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_API_KEY}/data`;



// --- QUESTIONS ---
export const getAllQuestionsByCategory = async (category:string):Promise<question[]> => {
  const res = await axios.get(`${FULL_BASE_URL}/Questions?pageSize=${DATA_PAGE_SIZE_LIMIT}&where=category.name='${category}'`);
  console.log("Fetched Questions:", res.data);
  return getRandomElements(res.data, QUESTIONS_LIMIT);
};

export const getQuestionById = async (id: string) => {
  const res = await axios.get(`${FULL_BASE_URL}/Questions/${id}`);
  return res.data;
};

export const getAllQuestions = async ():Promise<question[]> => {
  const res = await axios.get(`${FULL_BASE_URL}/Questions?loadRelations=category&pageSize=${DATA_PAGE_SIZE_LIMIT}`);
  console.log("Fetched Questions:", res.data);
  return res.data;
};

export const updateQuestion = async (id: string, qObj:Record<string,string>) => {
  const res = await axios.put(`${FULL_BASE_URL}/Questions/${id}`,qObj);
  return res.data;
};

export const createQuestion = async(qObj:Record<string,string>) => {
  const res = await axios.post(`${FULL_BASE_URL}/Questions`,qObj)
  return res.data
}

export const deleteQuestion = async (id: string) => {
  const res = await axios.delete(`${FULL_BASE_URL}/Questions/${id}`);
  return res.data;
};



// --- CATEGORIES ---
export const getAllCategories = async () => {
  const res = await axios.get(`${FULL_BASE_URL}/Categories?pageSize=${DATA_PAGE_SIZE_LIMIT}`);
  return res.data;
};

export const getCategoryById = async (id: string) => {
  const res = await axios.get(`${FULL_BASE_URL}/Categories/${id}`);
  return res.data;
};

export const createCategory = async (name: string) => {
  const res = await axios.post(`${FULL_BASE_URL}/Categories`,{"name":name});
  return res.data;
};

export const getCategoryByName = async (name: string) => {
  const res = await axios.get(`${FULL_BASE_URL}/Categories?where=name='${name}'`);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await axios.delete(`${FULL_BASE_URL}/Categories/${id}`);
  return res.data;
};

export const updateCategory = async (id: string, catObj:Record<string,string>) => {
  const res = await axios.put(`${FULL_BASE_URL}/Categories/${id}`,catObj);
  return res.data;
};



// --- SCORES (LEADERBOARD) ---
export const getAllScores = async () => {
  const res = await axios.get(`${FULL_BASE_URL}/Scores?loadRelations=category&pageSize=${DATA_PAGE_SIZE_LIMIT}`);
  return res.data;
};

export const createScore = async (scoreObj: { name: string; score: number; total_questions: number; category?: string }) => {
  const res = await axios.post(`${FULL_BASE_URL}/Scores`, scoreObj);
  return res.data;
};

export const getScoreById = async (id: string) => {
  const res = await axios.get(`${FULL_BASE_URL}/Scores/${id}`);
  return res.data;
};

export const deleteScore = async (id: string) => {
  const res = await axios.delete(`${FULL_BASE_URL}/Scores/${id}`);
  return res.data;
};




// --- UTILITY ---
export const linkScoreToCategory = async (scoreId: string, categoryId: string) => {
  const res = await axios.post(`${FULL_BASE_URL}/Scores/${scoreId}/Category`, [categoryId]);
  return res.data;
};

export const linkQuestionToCategory = async (questionId: string, categoryId: string) => {
  const res = await axios.post(`${FULL_BASE_URL}/Questions/${questionId}/Category`, [categoryId]);
  return res.data;
};



