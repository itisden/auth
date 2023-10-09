import type { User } from "types/user";
import type { AuthState } from "types/auth";

const authStorageKey = "auth";

export const saveAuthData = (user: User, token: string) => {
  localStorage.setItem(authStorageKey, JSON.stringify({ user, token }));
};

export const getAuthData = (): AuthState | null => {
  const serializedData = localStorage.getItem(authStorageKey) || "";

  if (!serializedData) {
    return null;
  }

  return JSON.parse(serializedData) as AuthState;
};

export const clearAuthData = () => localStorage.removeItem(authStorageKey);
