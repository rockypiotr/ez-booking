export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  role: UserRole;
}

export interface RegisterResponse {
  token: string;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  BUSINESS = 'BUSINESS',
}
