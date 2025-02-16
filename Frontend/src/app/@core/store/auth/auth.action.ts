import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginResponse } from '../../../@shared/models/auth';

export const login = createAction('[Auth] Login', props<LoginRequest>());

export const loginSuccess = createAction('[Auth] Login Success', props<LoginResponse>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
