"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, username: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: "1",
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@example.com",
  bio: "Frontend Developer | React & Next.js enthusiast | Coffee lover ☕",
  avatar: "https://placehold.co/100x100/81A1C1/E5E9F0",
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session
    setTimeout(() => {
        try {
            const storedUser = localStorage.getItem('nexus-user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            // If we're on the server, localStorage won't be available.
            // This is expected.
        }
        setLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    setLoading(true);
    console.log("Logging in with:", email, pass);
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(mockUser);
        localStorage.setItem('nexus-user', JSON.stringify(mockUser));
        setLoading(false);
        resolve();
      }, 1000);
    });
  };
  
  const register = async (name: string, username: string, email: string, pass: string): Promise<void> => {
    setLoading(true);
    console.log("Registering:", name, username, email, pass);
     return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...mockUser, name, username, email };
        setUser(newUser);
        localStorage.setItem('nexus-user', JSON.stringify(newUser));
        setLoading(false);
        resolve();
      }, 1000);
    });
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus-user');
  };

  const value = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
