import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AutoFocus } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMask } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { Step, StepList, StepPanel, StepPanels, Stepper } from 'primeng/stepper';
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
    TranslatePipe,
    AutoFocus,
    CommonModule,
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel,
    InputMask,
    MultiSelect,
  ],
  templateUrl: './register.html',
})
export class Register implements OnInit {
  form!: FormGroup;
  activeStep: number | WritableSignal<number> = 1;
  protected servicesList = ['Beauty salon'];
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
    this.form = this.authService.createRegisterForm();
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
    const { userData, businessData, servicesData } = this.form.getRawValue();

    return {
      ...userData,
      ...businessData,
      ...servicesData,
      role: UserRole.BUSINESS,
    };
  }
}
