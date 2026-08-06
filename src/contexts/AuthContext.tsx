import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { auth, db, googleProvider } from "../lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export type UserRole = "learner" | "student_mentor" | "graduate_tutor" | "educator_admin" | "donor_corporate";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  institution?: string;
  avatar?: string;
  bio?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (data: { email: string; password: string; name: string; role: UserRole; institution?: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Pick<UserProfile, "name" | "institution" | "bio" | "role">>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch extra profile data from Firestore
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUser({ id: firebaseUser.uid, ...docSnap.data() } as UserProfile);
        } else {
          // If no doc exists (e.g. fresh Google login), populate what we have
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;
    
    // Check if doc exists, if not create a basic one
    const docRef = doc(db, "users", firebaseUser.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const newProfile = {
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
      };
      await setDoc(docRef, newProfile);
    }
  };

  const signup = async (data: { email: string; password: string; name: string; role: UserRole; institution?: string }) => {
    const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    const newProfile = {
      email: data.email,
      name: data.name,
      role: data.role,
      institution: data.institution || "",
    };
    
    // Save additional data to Firestore
    await setDoc(doc(db, "users", result.user.uid), newProfile);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfile = async (data: Partial<Pick<UserProfile, "name" | "institution" | "bio" | "role">>) => {
    if (!user) return;
    const docRef = doc(db, "users", user.id);
    await updateDoc(docRef, data);
    setUser((prev) => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, loginWithGoogle, signup, logout, updateProfile }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
