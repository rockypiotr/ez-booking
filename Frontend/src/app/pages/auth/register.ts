import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { tap } from 'rxjs';
import { RegisterRequest, UserRole } from '../../@shared/models/auth';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
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
    DropdownModule,
    TranslatePipe,
  ],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full min-w-sm max-w-md m-4 p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <form (ngSubmit)="onRegister()" [formGroup]="form" class="space-y-8 max-w-sm">
          <h3>{{ 'auth.signUp' | translate }}</h3>
          <fieldset class="space-y-8">
            <div class="flex flex-col">
              <label class="mb-2" for="username">{{ 'auth.username' | translate }}</label>
              <input formControlName="username" id="username" pInputText />
            </div>

            <div class="flex flex-col">
              <label class="mb-2" for="password">{{ 'auth.password' | translate }}</label>
              <input formControlName="password" id="password" pInputText type="password" />
            </div>

            <div class="flex flex-col">
              <label class="mb-2" for="email">{{ 'auth.email' | translate }}</label>
              <input [email]="true" formControlName="email" id="email" pInputText />
            </div>

            <div class="flex flex-col">
              <label class="mb-2" for="role">{{ 'auth.role' | translate }}</label>
              <p-dropdown [options]="userRoles" formControlName="role">
                <ng-template let-option pTemplate="item">
                  {{ 'enum.userRole.' + option | translate }}
                </ng-template>
                <ng-template let-option pTemplate="selectedItem">
                  {{ 'enum.userRole.' + option | translate }}
                </ng-template>
              </p-dropdown>
            </div>
          </fieldset>

          <button
            [raised]="true"
            [rounded]="true"
            class="w-full"
            [label]="'auth.register' | translate"
            pButton
            pRipple
            type="submit"
          ></button>
          <p>
            {{ 'auth.alreadyHaveAccount' | translate }}
            <p-button
              [label]="'auth.login' | translate"
              variant="text"
              (onClick)="onSignIn()"
            ></p-button>
          </p>
        </form>
      </div>
    </div>
  `,
})
export class Register implements OnInit {
  form!: FormGroup;
  userRoles: UserRole[] = Object.values(UserRole);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.createForm();
  }

  onRegister(): void {
    this.validateForm();
    this.register();
  }

  onSignIn() {
    this.router.navigate(['/auth/login']);
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.email],
      role: [null, Validators.required],
    });
  }

  private validateForm(): void {
    if (this.form.invalid) {
      throw new Error('Invalid form');
    }
  }

  private register(): void {
    this.authService
      .register(this.getPayload())
      .pipe(
        tap(() => this.onSignIn()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private getPayload(): RegisterRequest {
    return this.form.getRawValue();
  }
}
