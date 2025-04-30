import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../@core/store/app.state';
import { logout } from '../../@core/store/auth/auth.action';
import { selectIsAuthenticated } from '../../@core/store/auth/auth.selectors';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../@shared/models/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment?.apiUrl || 'https://mock-api.com/api';
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store<AppState>);
  private readonly fb = inject(FormBuilder);

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

  createRegisterForm(): FormGroup {
    return this.fb.group({
      userData: this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        email: [null, [Validators.email]],
        phoneNumber: [null, [Validators.required]],
      }),
      businessData: this.fb.group({
        companyName: [null, [Validators.required]],
        websiteUrl: [null, []],
      }),
      servicesData: this.fb.group({
        services: [[], [Validators.required]],
      }),
    });
  }
}
