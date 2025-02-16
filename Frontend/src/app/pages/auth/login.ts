import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
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
  ],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full min-w-sm max-w-md m-4 p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <form class="space-y-8 max-w-sm" [formGroup]="form" (ngSubmit)="onLogin()">
          <h3>Sign in</h3>
          <fieldset class="space-y-8">
            <div class="flex flex-col">
              <label class="mb-2" for="username">username</label>
              <input pInputText id="username" formControlName="username" />
            </div>
            <div class="flex flex-col">
              <label class="mb-2" for="password">password</label>
              <input pInputText id="password" type="password" formControlName="password" />
            </div>
          </fieldset>
          <button
            pButton
            [rounded]="true"
            pRipple
            [raised]="true"
            class="w-full"
            label="Get started"
            type="submit"
          ></button>
          <p>
            Don’t have an account?
            <p-button variant="text" label="Sign up"></p-button>
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

  ngOnInit(): void {
    this.createForm();
  }

  onLogin(): void {
    this.validateForm();
    this.login();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['test', Validators.required],
      password: ['test', Validators.required],
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
