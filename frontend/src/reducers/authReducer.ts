

export interface AuthState {
  isAuthenticated: boolean;
}

export interface LoginAction {
  type: "LOGIN";
  payload: { token: string };
}

export interface LogoutAction {
  type: "LOGOUT";
}

export type AuthAction = LoginAction | LogoutAction;

export const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return { ...state, isAuthenticated: true };

    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
};
