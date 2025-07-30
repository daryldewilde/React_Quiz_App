import {
    getAllCategories, getCategoryById, updateCategory, deleteCategory, createCategory,
    getAllQuestions, getQuestionById, updateQuestion, deleteQuestion, createQuestion,
    getAllScores, getScoreById, deleteScore, linkQuestionToCategory
} from "./api";
import type { question, Score } from "../types/types";


const dataProvider = {
    // READ: List all records
    getList: async (resource: string, params:{filter:Record<string,string>}) => {
        console.log(params)
        switch (resource) {
            case 'Categories': {
                const categories = await getAllCategories();
                const mappedCategories = categories.map((cat: { objectId: string; name: string }) => ({
                    id: cat.objectId,
                    name: cat.name
                }));

                 if (params.filter.q) {
                    const searchText = params.filter.q.toLowerCase()
                    const filteredCategories = mappedCategories.filter((cat: { objectId: string; name: string }) => {
                        return JSON.stringify(cat).toLowerCase().includes(searchText)
                    })

                    return {
                        data: filteredCategories,
                        total:filteredCategories.length
                    }
                }
                return {
                    data: mappedCategories,
                    total: categories.length
                };
            }
            case 'Questions': {
                const questions: question[] = await getAllQuestions();
               
                const mappedQuestions = questions.map((q: question & { category?: { objectId?: string } }) => ({
                    ...q,
                    id: q.objectId,
                    Category_id: q.category?.objectId
                }));

                 if (params.filter.q) {
                    const searchText = params.filter.q.toLowerCase()
                    const filteredQuestions = mappedQuestions.filter(q => JSON.stringify(q).toLowerCase().includes(searchText))
                    return {
                        data: filteredQuestions,
                        total:filteredQuestions.length
                    }
                }

                return {
                    data: mappedQuestions,
                    total: questions.length
                };
            }
            case 'Scores': {
                const scores: Score[] = await getAllScores();

                if (params.filter.q) {
                    const searchText = params.filter.q.toLowerCase()
                    const filteredScores = scores.filter((score) => {
                        return JSON.stringify(score).toLowerCase().includes(searchText)
                    })
                    return{
                        data:filteredScores,
                        total:filteredScores.length
                    }
                }

                return {
                    data: scores.map((s: Score) => ({
                        ...s,
                        id: s.objectId,
                        Category_id: s.category?.objectId
                    })),
                    total: scores.length
                };
            }
            default:
                throw new Error(`Unsupported resource: ${resource}`);
        }
    },

    // READ: Get one record by ID
    getOne: async (resource: string, params: { id: string | number }) => {
        const idStr = typeof params.id === 'string' ? params.id : String(params.id);
        switch (resource) {
            case 'Categories': {
                const cat = await getCategoryById(idStr);
                return { data: { id: cat.objectId, name: cat.name } };
            }
            case 'Questions': {
                const question = await getQuestionById(idStr);
                console.log("mapped questions",question)
                return { data: { ...question, id: question.objectId, Category_id: question.category?.objectId } };
            }
            case 'Scores': {
                const score = await getScoreById(idStr);
                return { data: { ...score, id: score.objectId, Category_id: score.category?.objectId } };
            }
            default:
                throw new Error(`Unsupported resource: ${resource}`);
        }
    },

    // READ: Get many records by IDs (for ReferenceField/ReferenceInput)
    getMany: async (resource: string, params: { ids: (string | number)[] }) => {
        switch (resource) {
            case 'Categories': {
                const categories = await getAllCategories();
                const mapped = categories.map((cat: { objectId: string; name: string }) => ({
                    id: cat.objectId,
                    name: cat.name
                }));
                const idStrings = params.ids.map(String);
                return {
                    data: mapped.filter((cat: { id: string; name: string }) => idStrings.includes(String(cat.id)))
                };
            }
            default:
                throw new Error(`Unsupported resource: ${resource}`);
        }
    },

    //DELETE delete a recprd
    delete: async (resource: string, params: { id: string | number }) => {
    const idStr = typeof params.id === 'string' ? params.id : String(params.id);
    switch (resource) {
        case 'Categories': {
            const deleted = await deleteCategory(idStr);
            return { data: { ...deleted, id: params.id } };
        }
        case 'Questions': {
            const deleted = await deleteQuestion(idStr);
            return { data: { ...deleted, id: params.id } };
        }
        case 'Scores': {
            const deleted = await deleteScore(idStr);
            return { data: { ...deleted, id: params.id } };
        }
        default:
            throw new Error(`Unsupported resource: ${resource}`);
    }
},

    // CREATE: Create a new record
    create: async (resource: string, params: { data: Record<string, string> }) => {
        switch (resource) {
            case 'Categories': {
                const { name } = params.data;
                const newCat = await createCategory(name);
                return { data: { ...newCat, id: newCat.objectId } };
            }
            case 'Questions': {
                const { Category_id, ...reqObj } = params.data;
                const newQ = await createQuestion(reqObj);
                if (Category_id) {
                    await linkQuestionToCategory(newQ.ojectId, Category_id);
                }
                return { data: { ...newQ, id: newQ.ojectId } };
            }
            default:
                throw new Error(`Unsupported resource: ${resource}`);
        }
    },

    // UPDATE: Update a record
    update: async (resource: string, params: { id: string; data: Record<string, string> }) => {
        switch (resource) {
            case 'Categories': {
                const { name } = params.data;
                const updatedCat = await updateCategory(params.id, { name });
                return { data: { ...updatedCat, id: updatedCat.objectId } };
            }
            case 'Questions': {
                const updatedQ = await updateQuestion(params.id, params.data);
                return { data: { ...updatedQ, id: updatedQ.ojectId } };
            }
            default:
                throw new Error(`Unsupported resource: ${resource}`);
        }
    },

 

    // DELETE: Delete many records
    deleteMany: async (resource: string, params: { ids: (string | number)[] }) => {
        const ids = params.ids;
        switch (resource) {
            case 'Categories':
                await Promise.all(ids.map(id => deleteCategory(typeof id === 'string' ? id : String(id))));
                return { data: ids };
            case 'Questions':
                await Promise.all(ids.map(id => deleteQuestion(typeof id === 'string' ? id : String(id))));
                return { data: ids };
            case 'Scores':
                await Promise.all(ids.map(id => deleteScore(typeof id === 'string' ? id : String(id))));
                return { data: ids };
            default:
                throw new Error(`Unsupported resource: ${resource}`);
        }
    },

     getManyReference: async () => {
        throw new Error("getManyReference not implemented");
    },

    updateMany: async () => {
        throw new Error("updateMany not implemented");
    }
};


export default dataProvider