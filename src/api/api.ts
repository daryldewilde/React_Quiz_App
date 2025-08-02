// API configuration for quiz app

import axios from "axios";
import { shuffleElements } from "../utils/utils";
import type { credentials, question } from "../types/types";


const BASE_URL = import.meta.env.VITE_BASE_URL
const AUTH_SUBDOMAIN = import.meta.env.VITE_BACKENDLESS_AUTH_SUBDOMAIN
const BACKENDLESS_APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID
const BACKENDLESS_REST_API_KEY = import.meta.env.VITE_BACKENDLESS_REST_API_KEY;
const DATA_PAGE_SIZE_LIMIT = 100; // Default page size for data fetching
const QUESTIONS_LIMIT = 20; // Default limit for questions

const FULL_BASE_URL = `${BASE_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_API_KEY}/data`;


// --- Authentication for Admin ---
export const authenticate = async (credentials:credentials) =>{
  console.log('authenticating')
  const payload ={
    login:credentials.username,
    password:credentials.password
  }
  const res = await axios.post(`${AUTH_SUBDOMAIN}/api/users/login`, payload)
  return res.data
}


// --- QUESTIONS ---
export const getRandomQuestionsForCategory = async (category:string,):Promise<question[]> => {
  const offset = Math.floor(Math.random() * (await countTotalQuestionsForCategory(category)- QUESTIONS_LIMIT + 1));
  const res = await axios.get(`${FULL_BASE_URL}/Questions?pageSize=${QUESTIONS_LIMIT}&offset=${offset}&where=category.name='${category}'`);
  return shuffleElements(res.data);
};

export const getQuestionById = async (id: string) => {
  const res = await axios.get(`${FULL_BASE_URL}/Questions/${id}?loadRelations=category`);
  return res.data;
};

export const getAllQuestions = async ({
  pageSize = DATA_PAGE_SIZE_LIMIT,
  offset = 0,
  contains,
  sortString
}: {
  pageSize?: number;
  offset?: number;
  contains?: string;
  sortString?: string;
} = {}): Promise<question[]> => {
  let url = `${FULL_BASE_URL}/Questions?loadRelations=category&pageSize=${pageSize}&offset=${offset}`;
  if (contains) {
    const whereClause = encodeURIComponent(`question_text LIKE '%${contains}%' OR answer_options LIKE '%${contains}%' OR correct_answer LIKE '%${contains}%' OR category.name LIKE '%${contains}%'`);
    url += `&where=${whereClause}`;
  }
  if (sortString) {
    url += `&sortBy=${encodeURIComponent(sortString)}`;
  }
  const res = await axios.get(url);
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

export const countTotalQuestionsRecords = async (): Promise<number> => {
  const res = await axios.get(`${FULL_BASE_URL}/Questions?property=Count('objectId')`)
  return res.data[0].count
}


export const countTotalQuestionsForCategory = async (category:string): Promise<number> => {
  const res = await axios.get(`${FULL_BASE_URL}/Questions?property=Count('objectId')&where=category.name='${category}'`)
  return res.data[0].count
}



// --- CATEGORIES ---
export const getAllCategories = async ({
  pageSize = DATA_PAGE_SIZE_LIMIT,
  offset = 0,
  contains,
  sortString
}: {
  pageSize?: number;
  offset?: number;
  contains?: string;
  sortString?: string;
} = {}): Promise<[]> => {
  let url = `${FULL_BASE_URL}/Categories?pageSize=${pageSize}&offset=${offset}`;

  if (contains) {
    const whereClause = encodeURIComponent(`name LIKE '%${contains}%'`);
    url += `&where=${whereClause}`;
  }

  if (sortString) {
    url += `&sortBy=${encodeURIComponent(sortString)}`;
  }

  const res = await axios.get(url);
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

export const countTotalCategoriesRecords = async ():Promise<number> => {
  const res = await axios.get(`${FULL_BASE_URL}/Categories?property=Count('objectId')`)
  return res.data[0].count
}


// --- SCORES (LEADERBOARD) ---
export const getAllScores = async ({
  pageSize = DATA_PAGE_SIZE_LIMIT,
  offset = 0,
  contains,
  sortString
}: {
  pageSize?: number;
  offset?: number;
  contains?: string;
  sortString?: string;
} = {}): Promise<[]> => {
  let url = `${FULL_BASE_URL}/Scores?loadRelations=category&pageSize=${pageSize}&offset=${offset}`;
  if (contains) {
    const whereClause = encodeURIComponent(`name LIKE '%${contains}%' OR score LIKE '%${contains}%' OR category.name LIKE '%${contains}%'`);
    url += `&where=${whereClause}`;
  }
  if (sortString) {
    url += `&sortBy=${encodeURIComponent(sortString)}`;
  }
  const res = await axios.get(url);
  return res.data;
};

export const createScore = async (scoreObj: { name: string; score: number; total_questions: number; category?: string }) => {
  const res = await axios.post(`${FULL_BASE_URL}/Scores`, scoreObj);
  return res.data;
};

export const getScoreById = async (id: string) => {
  const res = await axios.get(`${FULL_BASE_URL}/Scores/${id}?loadRelations=category`);
  return res.data;
};

export const deleteScore = async (id: string) => {
  const res = await axios.delete(`${FULL_BASE_URL}/Scores/${id}`);
  return res.data;
};

export const countTotalScoresRecords = async () : Promise<number>=> {
  const res = await axios.get(`${FULL_BASE_URL}/Scores?property=Count('objectId')`)
  return res.data[0].count
}



// --- UTILITY ---
export const linkScoreToCategory = async (scoreId: string, categoryId: string) => {
  const res = await axios.post(`${FULL_BASE_URL}/Scores/${scoreId}/Category`, [categoryId]);
  return res.data;
};

export const linkQuestionToCategory = async (questionId: string, categoryId: string) => {
  const res = await axios.post(`${FULL_BASE_URL}/Questions/${questionId}/Category`, [categoryId]);
  return res.data;
};



