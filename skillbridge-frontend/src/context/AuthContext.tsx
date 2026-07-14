import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type User = {
  id: number;
  email: string;
  fullName: string;
  type: "JobSeeker" | "Admin";
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isJobSeeker: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (userData: User) => {
    setUser(userData);
    // persist token and user for private API usage
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // initialize from localStorage if available
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as User;
        setUser(parsed);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = !!user && user.type === "Admin";
  const isJobSeeker = !!user && user.type === "JobSeeker";
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isAdmin, isJobSeeker }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};