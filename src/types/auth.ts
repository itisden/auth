import type { User } from "./user";

export interface AuthContext {
  user: User | null;
  token: string;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthState {
  user: User | null;
  token: string;
}

export type AuthAction =
  | { type: "login"; payload: { user: User; token: string } }
  | { type: "logout" };
