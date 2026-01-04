import { useState, useCallback, type ReactNode } from "react";
import { authService } from "../api/authService";
import type { User, LoginRequest, RegisterRequest } from "../types/auth";
import { AuthContext } from "./authContextDef";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  });

  const [isLoading] = useState(false);

  const login = useCallback(async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    localStorage.setItem("authToken", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    setUser(response.user);
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    const response = await authService.register(data);
    localStorage.setItem("authToken", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    setUser(response.user);
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
