import { createContext, useReducer, useContext } from "react";
import type {
  AuthContext as AuthContextType,
  AuthState,
  AuthAction,
} from "types/auth";
import * as authApi from "api/auth";
import * as authLocalStorage from "./authLocalStorage";

export const AuthContext = createContext({} as AuthContextType);

const initialAuthState = {
  user: null,
  token: "",
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "login": {
      return {
        ...action.payload,
      };
    }
    case "logout": {
      return {
        ...initialAuthState,
      };
    }
    default:
      return state;
  }
};

const loadAuthState = (initialData: AuthState) => {
  const restoredAuth = authLocalStorage.getAuthData();

  if (!restoredAuth) return initialData;

  return restoredAuth;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialAuthState,
    loadAuthState
  );

  const login = async (email: string, password: string) => {
    const { user, token } = await authApi.login(email, password);
    authLocalStorage.saveAuthData(user, token);
    dispatch({
      type: "login",
      payload: {
        user,
        token,
      },
    });
  };

  const logout = async () => {
    authLocalStorage.clearAuthData();
    dispatch({ type: "logout" });
  };

  const value = {
    ...state,
    login,
    logout,
    isAuthenticated: state.token !== "",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
