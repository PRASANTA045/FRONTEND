import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/api/axios";

interface User {
  id: number;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load token + user from sessionStorage after refresh
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userStr = sessionStorage.getItem("user");
    if (token && userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // SIGNUP
  const signup = async (fullName: string, email: string, password: string) => {
    await api.post("/api/auth/register", {
      fullName,
      email,
      password,
      role: "USER",
    });
  };

  // LOGIN
  const login = async (email: string, password: string) => {
    const response = await api.post("/api/auth/login", { email, password });

    const token = response.data.token;
    sessionStorage.setItem("token", token);

    // fetch user details
    const me = await api.get("/api/users/me");
    sessionStorage.setItem("user", JSON.stringify(me.data));
    setUser(me.data);
  };

  // LOGOUT
  const logout = () => {
    sessionStorage.clear(); // delete everything
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        isAdmin: user?.role === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
