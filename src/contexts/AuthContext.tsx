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
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // -----------------------------
  // AUTO-LOGIN (if cookie exists)
  // -----------------------------
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/api/users/me"); // cookie auto-sent
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };

    loadUser();
  }, []);

  // -----------------------------
  // SIGNUP
  // -----------------------------
  const signup = async (fullName: string, email: string, password: string) => {
    await api.post("/api/auth/register", {
      fullName,
      email,
      password,
      role: "USER",
    });
  };

  // -----------------------------
  // LOGIN (cookie auto-handled)
  // -----------------------------
  const login = async (email: string, password: string) => {
    const res = await api.post("/api/auth/login", { email, password });

    // Backend returns { message, user }
    const loggedUser = res.data.user;
    setUser(loggedUser);

    return loggedUser; // return so login page knows role
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = async () => {
    try {
      await api.post("/api/auth/logout"); // backend cookie clear karega
    } catch (err) {
      console.error("Logout error:", err);
    }
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
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
