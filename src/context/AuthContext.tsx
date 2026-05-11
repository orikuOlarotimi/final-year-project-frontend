"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

type LoginPayload = {
  access_token: string;
  refresh_token: string;
};

type AuthContextType = AuthState & {
  login: (payload: LoginPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken && refreshToken) {
      setAuth({
        isAuthenticated: true,
        accessToken,
        refreshToken,
      });
    }
  }, []);

  const login = ({ access_token, refresh_token }: LoginPayload) => {
    localStorage.setItem("access_token", access_token);

    localStorage.setItem("refresh_token", refresh_token);

    setAuth({
      isAuthenticated: true,
      accessToken: access_token,
      refreshToken: refresh_token,
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");

    localStorage.removeItem("refresh_token");

    setAuth({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
