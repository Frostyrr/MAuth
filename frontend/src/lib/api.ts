import API from "../config/apiClient";

export const login = async (data: Record<string, any>) => API.post("/auth/login", data);
export const register = async (data: Record<string, any>) => API.post("/auth/register", data);