
// API configuration for quiz questions service

// This is the endpoint where quiz questions can be fetched
export const baseUrl = "https://quizapi.io/api/v1/questions";

// Default query parameters for fetching quiz questions
export const queryParams = {
    apiKey : process.env.REACT_APP_QUIZ_API_KEY,
    limit: 20,
    difficulty: "Easy",
    multiple_correct_answers: "false"
};

// React Query cache configuration
export const gcTime = 1000 * 60 * 30; // 30 mins - how long to keep data in cache
export const staleTime = 1000 * 60 * 30; // 30 mins - how long data is considered fresh

// Categories available for quizzes
export const categories = [
    "Linux",
    "Javascript",
    "Docker",
    "nodeJS",
    "HTML",
    "MySQL",
    "React", 
    "PHP",
    "BASH"
];

