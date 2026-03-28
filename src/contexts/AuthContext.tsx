import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "learner" | "student_mentor" | "graduate_tutor" | "educator_admin" | "donor_corporate";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  institution?: string;
  avatar?: string;
  bio?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { email: string; password: string; name: string; role: UserRole; institution?: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<UserProfile, "name" | "institution" | "bio">>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem("pw_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, _password: string) => {
    const mockUser: UserProfile = {
      id: crypto.randomUUID(),
      email,
      name: email.split("@")[0],
      role: "learner",
    };
    localStorage.setItem("pw_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const signup = useCallback(async (data: { email: string; password: string; name: string; role: UserRole; institution?: string }) => {
    const mockUser: UserProfile = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      role: data.role,
      institution: data.institution,
    };
    localStorage.setItem("pw_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("pw_user");
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<Pick<UserProfile, "name" | "institution" | "bio">>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem("pw_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
