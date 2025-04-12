import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { AutoFocus } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppState } from '../../@core/store/app.state';
import { login } from '../../@core/store/auth/auth.action';
import { LoginRequest } from '../../@shared/models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    ReactiveFormsModule,
    TranslatePipe,
    AutoFocus,
  ],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full min-w-sm max-w-md m-4 p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <form class="space-y-8 max-w-sm" [formGroup]="form" (ngSubmit)="onLogin()">
          <h3>{{ 'auth.form.label.signIn' | translate }}</h3>
          <fieldset class="space-y-8">
            <div class="flex flex-col">
              <label class="mb-2" for="username">{{
                'auth.form.label.username' | translate
              }}</label>
              <input pInputText id="username" [pAutoFocus]="true" formControlName="username" />
            </div>
            <div class="flex flex-col">
              <label class="mb-2" for="password">{{
                'auth.form.label.password' | translate
              }}</label>
              <input pInputText id="password" type="password" formControlName="password" />
            </div>
          </fieldset>
          <button
            pRipple
            pButton
            [raised]="true"
            class="w-full"
            [label]="'button.login' | translate"
            type="submit"
          ></button>
          <p>
            {{ 'auth.link.dontHaveAccount' | translate }}
            <p-button
              variant="text"
              [label]="'button.register' | translate"
              (onClick)="onSignUp()"
            ></p-button>
          </p>
        </form>
      </div>
    </div>
  `,
})
export class Login implements OnInit {
  form!: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.createForm();
  }

  onLogin(): void {
    this.validateForm();
    this.login();
  }

  onSignUp() {
    this.router.navigate(['/auth/register']);
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['adminp', Validators.required],
      password: ['adminpadminp', Validators.required],
    });
  }

  private validateForm(): void {
    if (this.form.invalid) {
      throw new Error('Invalid form');
    }
  }

  private login(): void {
    this.store.dispatch(login(this.getPayload()));
  }

  private getPayload(): LoginRequest {
    return this.form.getRawValue();
  }
}
