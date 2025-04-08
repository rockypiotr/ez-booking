import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppState } from '../../@core/store/app.state';
import { logout } from '../../@core/store/auth/auth.action';
import { selectIsAuthenticated } from '../../@core/store/auth/auth.selectors';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../@shared/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store<AppState>);

  get isAuthenticated$(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated);
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, payload);
  }
}
