"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, getUserById } from "./db";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const sessionData = sessionStorage.getItem("clinic_session");
        if (sessionData) {
          const { userId } = JSON.parse(sessionData);
          const storedUser = await getUserById(userId);
          if (storedUser) {
            setUser(storedUser);
          } else {
            sessionStorage.removeItem("clinic_session");
          }
        }
      } catch {
        sessionStorage.removeItem("clinic_session");
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = useCallback((u: User) => {
    setUser(u);
    sessionStorage.setItem("clinic_session", JSON.stringify({ userId: u.id }));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("clinic_session");
  }, []);

  const refreshUser = useCallback(async () => {
    if (user?.id) {
      const fresh = await getUserById(user.id);
      if (fresh) setUser(fresh);
    }
  }, [user?.id]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
