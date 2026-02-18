import { apiClient } from "@/lib/api/client";

export const authService = {
  login: (username: string, password: string) =>
    apiClient.post("/v1/auth/login", { username, password }),

//   signup: (data: any) => apiClient.post("/auth/signup", data),

  getProfile: () => apiClient.get("/v1/auth/me"),
};
