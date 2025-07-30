import type { AuthProvider } from "react-admin";
import type { credentials } from "../types/types";
import { authenticate } from "./api";

const authProvider: AuthProvider = {
    // Send username and password to the auth server and get back credentials
    login: async (params: credentials) => {
        console.log(params)
        const data = await authenticate(params);
        console.log(data)
        if (data && data["user-token"] && data.admin_name) {
            localStorage.setItem("user-token", data["user-token"]);
            localStorage.setItem("admin_name", data.admin_name);
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    },

    // Remove local credentials and notify the auth server of the logout
    logout: async () => {
        localStorage.removeItem("user-token");
        localStorage.removeItem("admin_name");
        return Promise.resolve();
    },

    // Verify that the user's credentials are still valid during navigation
    checkAuth: async () => {
        return localStorage.getItem("user-token") ? Promise.resolve() : Promise.reject();
    },

    // Check if an error from the dataProvider indicates an authentication issue
    checkError: async (error) => {
        const status = error.status || error.response?.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem("user-token");
            localStorage.removeItem("admin_name");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // Retrieve the user's profile
    getIdentity: async () => {
        const admin_name = localStorage.getItem("admin_name");
        if (admin_name) {
            return Promise.resolve({ id: admin_name, fullName: admin_name });
        }
        return Promise.reject();
    }
    
};

export default authProvider