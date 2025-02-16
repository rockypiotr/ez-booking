import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.action';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
  })),
  on(logout, () => initialAuthState)
);
