import API from "../config/apiClient";

export const login = async (data: Record<string, any>) => API.post("/auth/login", data);
export const logout = async () => API.get("/auth/logout");
export const register = async (data: Record<string, any>) => API.post("/auth/register", data);
export const verifyEmail = async (verificationCode: string) => API.get(`/auth/email/verify/${verificationCode}`);
export const resendVerificationEmail = async (email: string) => API.post("/auth/email/resend", { email });
export const sendPasswordResetEmail = async (email: string) => API.post("/auth/password/forgot", { email });
export const resetPassword = async (data: Record<string, any>) => API.post("/auth/password/reset", data);

export const getUser = async () => API.get("/user");
export const getSessions = async () => API.get("/sessions");
export const deleteSession = async (id: string) => API.delete(`/sessions/${id}`);