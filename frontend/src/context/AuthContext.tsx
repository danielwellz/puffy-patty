import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { apiFetch } from "../api/client";
import { UserRole } from "../types";

type JwtShape = { role?: UserRole; branchId?: string };

type AuthContextValue = {
  token: string | null;
  role: UserRole | null;
  branchId?: string | null;
  hasPassword: boolean;
  isNewUser: boolean;
  sendCode: (phone: string) => Promise<void>;
  verifyCode: (phone: string, code: string) => Promise<void>;
  loginWithPassword: (phone: string, password: string) => Promise<void>;
  setPassword: (password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const TOKEN_KEY = "puffy-token";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [role, setRole] = useState<UserRole | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [hasPassword, setHasPassword] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      try {
        const decoded = jwtDecode<JwtShape>(token);
        setRole((decoded.role as UserRole) || null);
        setBranchId(decoded.branchId || null);
      } catch (err) {
        console.warn("Failed to decode token", err);
      }
    } else {
      localStorage.removeItem(TOKEN_KEY);
      setRole(null);
      setBranchId(null);
      setHasPassword(false);
      setIsNewUser(false);
    }
  }, [token]);

  const sendCode = useCallback(async (phone: string) => {
    await apiFetch("/auth/send-code", { method: "POST", body: JSON.stringify({ phone }) });
  }, []);

  const verifyCode = useCallback(
    async (phone: string, code: string) => {
      const res = await apiFetch<{ token: string; isNewUser: boolean; hasPassword: boolean; role: UserRole }>(
        "/auth/verify-code",
        { method: "POST", body: JSON.stringify({ phone, code }) }
      );
      setToken(res.token);
      setHasPassword(res.hasPassword);
      setIsNewUser(res.isNewUser);
    },
    []
  );

  const loginWithPassword = useCallback(async (phone: string, password: string) => {
    const res = await apiFetch<{ token: string; role: UserRole; branchId?: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ phone, password })
    });
    setToken(res.token);
    setHasPassword(true);
    setIsNewUser(false);
    setRole(res.role);
    setBranchId(res.branchId || null);
  }, []);

  const setPassword = useCallback(
    async (password: string) => {
      if (!token) throw new Error("Not authenticated");
      await apiFetch("/auth/set-password", { method: "POST", body: JSON.stringify({ password }) }, token);
      setHasPassword(true);
    },
    [token]
  );

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      role,
      branchId,
      hasPassword,
      isNewUser,
      sendCode,
      verifyCode,
      loginWithPassword,
      setPassword,
      logout
    }),
    [token, role, branchId, hasPassword, isNewUser, sendCode, verifyCode, loginWithPassword, setPassword, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("AuthContext missing");
  }
  return ctx;
};
