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
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // -----------------------------------------------------
  // LOAD USER FROM SESSION ON PAGE REFRESH
  // -----------------------------------------------------
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // -----------------------------------------------------
  // SIGNUP
  // -----------------------------------------------------
  const signup = async (fullName: string, email: string, password: string) => {
    await api.post("/api/auth/register", {
      fullName,
      email,
      password,
      role: "USER",
    });
  };

  // -----------------------------------------------------
  // LOGIN
  // -----------------------------------------------------
  const login = async (email: string, password: string) => {
    // Send login request
    const res = await api.post("/api/auth/login", { email, password });

    // Extract token
    const token = res.data.token;
    sessionStorage.setItem("token", token);

    // Get user info
    const me = await api.get("/api/users/me");

    sessionStorage.setItem("user", JSON.stringify(me.data));
    setUser(me.data);

    return me.data;
  };

  // -----------------------------------------------------
  // LOGOUT
  // -----------------------------------------------------
  const logout = () => {
    sessionStorage.clear();
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
