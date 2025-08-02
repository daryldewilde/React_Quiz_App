/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    getAllCategories, getCategoryById, updateCategory, deleteCategory, createCategory,
    getAllQuestions, getQuestionById, updateQuestion, deleteQuestion, createQuestion,
    getAllScores, getScoreById, deleteScore, linkQuestionToCategory,
    countTotalQuestionsRecords, countTotalScoresRecords, countTotalCategoriesRecords,
    getConfigs,
    updateConfigs
} from "./api";
import type { question, Score } from "../types/types";
import type { DataProvider, GetListParams, GetListResult, GetManyParams, GetManyResult, GetOneParams, GetOneResult, DeleteParams, DeleteResult, CreateParams, CreateResult, UpdateParams, UpdateResult, DeleteManyParams, DeleteManyResult } from "react-admin";

const dataProvider: DataProvider = {
    getList: async (resource: string, params: GetListParams): Promise<GetListResult<any>> => {
        switch (resource) {
            case 'Categories': {
                const pageSize = params.pagination?.perPage ?? 10;
                const offset = ((params.pagination?.page ?? 1) - 1) * pageSize;
                let sortString;
                if (params.sort?.field === "id" || params.sort?.field === "Category_id") {
                    sortString = undefined;
                } else {
                    sortString = `\`${params.sort?.field}\` ${params.sort?.order}`;
                }
                let categories;
                if (params.filter?.q) {
                    const searchText = params.filter.q.toLowerCase();
                    categories = await getAllCategories({ pageSize, offset, contains: searchText, sortString });
                } else {
                    categories = await getAllCategories({ pageSize, offset, sortString });
                }
                const mappedCategories = categories!.map((cat: { objectId: string; name: string }) => ({
                    id: cat.objectId,
                    name: cat.name
                }));
                return {
                    data: mappedCategories,
                    total: await countTotalCategoriesRecords()
                };
            }
            case 'Questions': {
                const pageSize = params.pagination?.perPage ?? 10;
                const offset = ((params.pagination?.page ?? 1) - 1) * pageSize;
                let sortString;
                if (params.sort?.field === "id" || params.sort?.field === "Category_id") {
                    sortString = undefined;
                } else {
                    sortString = `\`${params.sort?.field}\` ${params.sort?.order}`;
                }
                let questions;
                if (params.filter?.q) {
                    const searchText = params.filter.q.toLowerCase();
                    questions = await getAllQuestions({ pageSize, offset, contains: searchText, sortString });
                } else {
                    questions = await getAllQuestions({ pageSize, offset, sortString });
                }
                const mappedQuestions = questions!.map((q: question & { category?: { objectId?: string } }) => ({
                    ...q,
                    id: q.objectId,
                    Category_id: q.category?.objectId
                }));
                return {
                    data: mappedQuestions,
                    total: await countTotalQuestionsRecords()
                };
            }
            case 'Scores': {
                const pageSize = params.pagination?.perPage ?? 10;
                const offset = ((params.pagination?.page ?? 1) - 1) * pageSize;
                let sortString;
                if (params.sort?.field === "id" || params.sort?.field === "Category_id") {
                    sortString = undefined;
                } else {
                    sortString = `\`${params.sort?.field}\` ${params.sort?.order}`;
                }
                let scores;
                if (params.filter?.q) {
                    const searchText = params.filter.q.toLowerCase();
                    scores = await getAllScores({ pageSize, offset, contains: searchText, sortString });
                } else {
                    scores = await getAllScores({ pageSize, offset, sortString });
                }
                const mappedScores = scores!.map((s: Score) => ({
                    ...s,
                    id: s.objectId,
                    Category_id: s.category?.objectId
                }));
                return {
                    data: mappedScores,
                    total: await countTotalScoresRecords()
                };
            }
            case 'Configs': {
                const configs = await getConfigs()
                const mappedConfigs = [{...configs, id:configs.objectId}]
                return {
                    data: mappedConfigs,
                    total: 1
                };
            }
            default:
                throw new Error(`Unsupported resource: ${resource}`);
        }
    },

    getOne: async (resource: string, params: GetOneParams): Promise<GetOneResult<any>> => {
        const idStr = typeof params.id === 'string' ? params.id : String(params.id);
        switch (resource) {
            case 'Categories': {
                const cat = await getCategoryById(idStr);
                return { data: { id: cat.objectId, name: cat.name } };
            }
            case 'Questions': {
                const question = await getQuestionById(idStr);
                return { data: { ...question, id: question.objectId, Category_id: question.category?.objectId } };
            }
            case 'Scores': {
                const score = await getScoreById(idStr);
                return { data: { ...score, id: score.objectId, Category_id: score.category?.objectId } };
            }
            case 'Configs': {
                const config = await getConfigs();
                return { data:{...config, id:config.objectId}};
            }
            default:
                throw new Error(`Unsupported resource: ${resource}`);
        }
    },

    getMany: async (resource: string, params: GetManyParams): Promise<GetManyResult<any>> => {
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

    delete: async (resource: string, params: DeleteParams): Promise<DeleteResult<any>> => {
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

    create: async (resource: string, params: CreateParams): Promise<CreateResult<any>> => {
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
                    await linkQuestionToCategory(newQ.objectId, Category_id);
                }
                return { data: { ...newQ, id: newQ.objectId } };
            }
            default:
                throw new Error(`Unsupported resource: ${resource}`);
        }
    },

    update: async (resource: string, params: UpdateParams): Promise<UpdateResult<any>> => {
        switch (resource) {
            case 'Categories': {
                const { name } = params.data;
                const updatedCat = await updateCategory(params.id, { name });
                return { data: { ...updatedCat, id: updatedCat.objectId } };
            }
            case 'Questions': {
                const updatedQ = await updateQuestion(params.id, params.data);
                return { data: { ...updatedQ, id: updatedQ.objectId } };
            }
            case 'Configs': {
                console.log(params)
                const updatedConfig = await updateConfigs(params.id, params.data);
                return { data: { ...updatedConfig, id: updatedConfig.objectId } };
            }
            default:
                throw new Error(`Unsupported resource: ${resource}`);
        }
    },

    deleteMany: async (resource: string, params: DeleteManyParams): Promise<DeleteManyResult<any>> => {
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

export default dataProvider;