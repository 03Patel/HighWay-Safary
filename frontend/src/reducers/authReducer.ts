export interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string; role: "user" | "admin" } | null;
}

export interface LoginAction {
  type: "LOGIN";
  payload: { id: string; email: string; role: "user" | "admin" };
}

export interface LogoutAction {
  type: "LOGOUT";
}

export type AuthAction = LoginAction | LogoutAction;

// Initialize from localStorage if page reloads
export const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: localStorage.getItem("role")
    ? {
      id: localStorage.getItem("userId") || "",
      email: localStorage.getItem("email") || "",
      role: localStorage.getItem("role") === "admin" ? "admin" : "user",
    }
    : null,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.id);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("email", action.payload.email);
      return { ...state, isAuthenticated: true, user: action.payload };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      return { ...state, isAuthenticated: false, user: null };

    default:
      return state;
  }
};