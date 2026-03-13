import React, { createContext, useReducer, ReactNode } from "react";
import { authReducer, initialState, AuthState, AuthAction } from "./authReducer";

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};