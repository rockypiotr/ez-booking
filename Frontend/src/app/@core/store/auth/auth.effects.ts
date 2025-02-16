import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../pages/service/auth.service';
import { login, loginFailure, loginSuccess, logout } from './auth.action';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ type, ...credentials }) =>
        this.authService.login(credentials).pipe(
          map((loginResponse) => loginSuccess(loginResponse)),
          catchError((error) => of(loginFailure({ error: error.message })))
        )
      )
    )
  );
  private readonly router = inject(Router);

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );
}
