import { apiClient } from "./config";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  // User,
} from "../types/auth";

export const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  /**
   * Logout the current user
   */
  // logout: async (): Promise<void> => {
  //   await apiClient.post("/api/auth/logout");
  // },

  /**
   * Get the current user's profile
   */
  // getProfile: async (): Promise<User> => {
  //   const response = await apiClient.get<User>("/api/auth/me");
  //   return response.data;
  // },
};
