import { Component, ChangeDetectionStrategy, inject, signal, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../services/auth-store';
import { FormInputComponent } from '../../../../shared/components/form-input/form-input';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormInputComponent,
    ButtonComponent,
    LanguageSwitcherComponent,
    TranslatePipe,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly loginForm: FormGroup;
  protected readonly isLoading = this.authService.isLoading;
  protected readonly authError = this.authService.error;

  constructor() {
    this.loginForm = this.createLoginForm();
    this.setupFormValidation();
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  private setupFormValidation(): void {
    // Clear auth errors when user starts typing
    this.loginForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.authError()) {
        // Clear error when user modifies form
      }
    });
  }

  protected onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading()) {
      const { email, password } = this.loginForm.value;

      this.authService
        .login({ email, password })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            // Error handling is managed by the service
            this.loginForm.patchValue({ password: '' });
          },
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  protected getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);

    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${
          field.errors['minlength'].requiredLength
        } characters`;
      }
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      email: 'Email',
      password: 'Password',
    };
    return labels[fieldName] || fieldName;
  }
}
