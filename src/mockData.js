export const categories = [
  "linux",
  "javascript",
  "react",
  "css"
];

export const questions = [
  {
    id: 1,
    question: "How to delete a directory in Linux?",
    description: "delete folder",
    answers: {
      answer_a: "ls",
      answer_b: "delete",
      answer_c: "remove",
      answer_d: "rmdir",
      answer_e: null,
      answer_f: null
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "true",
      answer_e_correct: "false",
      answer_f_correct: "false"
    },
    explanation: "rmdir deletes an empty directory",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Which command lists files in a directory?",
    description: "list files",
    answers: {
      answer_a: "ls",
      answer_b: "cd",
      answer_c: "pwd",
      answer_d: "mv",
      answer_e: null,
      answer_f: null
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false"
    },
    explanation: "ls lists files and directories",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "How do you change directory in Linux?",
    description: "change directory",
    answers: {
      answer_a: "cd",
      answer_b: "ls",
      answer_c: "mv",
      answer_d: "rm",
      answer_e: null,
      answer_f: null
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false"
    },
    explanation: "cd changes the current directory",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "Which command removes a file?",
    description: "remove file",
    answers: {
      answer_a: "rm",
      answer_b: "mv",
      answer_c: "cp",
      answer_d: "ls",
      answer_e: null,
      answer_f: null
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false"
    },
    explanation: "rm removes files",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy"
  },
  {
    id: 5,
    question: "How do you display the current directory?",
    description: "show current directory",
    answers: {
      answer_a: "pwd",
      answer_b: "ls",
      answer_c: "cd",
      answer_d: "rm",
      answer_e: null,
      answer_f: null
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false"
    },
    explanation: "pwd prints the working directory",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy"
  },
  {
    id: 6,
    question: "Which command copies files?",
    description: "copy files",
    answers: {
      answer_a: "cp",
      answer_b: "mv",
      answer_c: "rm",
      answer_d: "ls",
      answer_e: null,
      answer_f: null
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false"
    },
    explanation: "cp copies files and directories",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy"
  },
  {
    id: 7,
    question: "How do you move files?",
    description: "move files",
    answers: {
      answer_a: "mv",
      answer_b: "cp",
      answer_c: "rm",
      answer_d: "ls",
      answer_e: null,
      answer_f: null
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false"
    },
    explanation: "mv moves files and directories",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy"
  },
  {
    id: 8,
    question: "Which command displays file contents?",
    description: "show file contents",
    answers: {
      answer_a: "cat",
      answer_b: "ls",
      answer_c: "mv",
      answer_d: "rm",
      answer_e: null,
      answer_f: null
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false"
    },
    explanation: "cat displays file contents",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy"
  },
  {
    id: 9,
    question: "How do you search for text in files?",
    description: "search text",
    answers: {
      answer_a: "grep",
      answer_b: "find",
      answer_c: "ls",
      answer_d: "mv",
      answer_e: null,
      answer_f: null
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false"
    },
    explanation: "grep searches for text patterns in files",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy"
  },
  {
    id: 10,
    question: "Which command displays running processes?",
    description: "show processes",
    answers: {
      answer_a: "ps",
      answer_b: "ls",
      answer_c: "mv",
      answer_d: "rm",
      answer_e: null,
      answer_f: null
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false"
    },
    explanation: "ps displays running processes",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy"
  }
];
