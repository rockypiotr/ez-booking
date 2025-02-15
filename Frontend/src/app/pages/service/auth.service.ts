import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../@shared/models/auth';

interface ILoginData {
  username: string;
  password: string;
}

interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginData);
  }

  setCredentials(token: string) {
    localStorage.setItem('token', token);
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }
}
