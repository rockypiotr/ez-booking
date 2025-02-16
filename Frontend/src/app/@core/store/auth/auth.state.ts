export interface AuthState {
  user: { id: string; username: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};
