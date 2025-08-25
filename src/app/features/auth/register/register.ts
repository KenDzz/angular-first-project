import { Component, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../../core/services/auth.service';
import { AuthValidators } from '../../../core/validators/auth.validators';
import { FormInputComponent } from '../../../shared/components/form-input/form-input';
import { ButtonComponent } from '../../../shared/components/button/button';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormInputComponent,
    ButtonComponent,
    LanguageSwitcherComponent,
    TranslatePipe,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly registerForm: FormGroup;
  protected readonly isLoading = this.authService.isLoading;
  protected readonly authError = this.authService.error;

  constructor() {
    this.registerForm = this.createRegisterForm();
    this.setupFormValidation();
  }

  private createRegisterForm(): FormGroup {
    return this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, AuthValidators.strongPassword()]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [AuthValidators.confirmPassword('password')],
      }
    );
  }

  private setupFormValidation(): void {
    // Clear auth errors when user starts typing
    this.registerForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.authError()) {
        // Clear error when user modifies form
      }
    });
  }

  protected onSubmit(): void {
    if (this.registerForm.valid && !this.isLoading()) {
      const { firstName, lastName, email, password } = this.registerForm.value;

      this.authService
        .register({ firstName, lastName, email, password })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            // Error handling is managed by the service
            this.registerForm.patchValue({
              password: '',
              confirmPassword: '',
            });
          },
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach((key) => {
      this.registerForm.get(key)?.markAsTouched();
    });
  }

  protected getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    const form = this.registerForm;

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
      if (field.errors['strongPassword']) {
        return 'Password must contain uppercase, lowercase, number, special character and be 8+ characters';
      }
    }

    // Check form-level password confirmation error
    if (fieldName === 'confirmPassword' && form.errors?.['passwordMismatch'] && field?.touched) {
      return 'Passwords do not match';
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
    };
    return labels[fieldName] || fieldName;
  }
}
