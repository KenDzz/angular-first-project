import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../../core/auth/services/auth-store';
import { LanguageService } from '../../../core/services/language.service';
import { FormInputComponent } from '../../../shared/components/form-input/form-input';
import { ButtonComponent } from '../../../shared/components/button/button';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-settings',
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    ButtonComponent,
    LanguageSwitcherComponent,
    TranslatePipe,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly languageService = inject(LanguageService);

  protected readonly user = this.authService.user;
  protected readonly currentLanguage = this.languageService.currentLanguage;
  protected readonly isSaving = signal(false);

  protected readonly settingsForm: FormGroup;
  protected readonly languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  constructor() {
    this.settingsForm = this.createSettingsForm();
  }

  private createSettingsForm(): FormGroup {
    const user = this.user();
    return this.fb.group({
      firstName: [user?.firstName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [user?.lastName || '', [Validators.required, Validators.minLength(2)]],
      email: [user?.email || '', [Validators.required, Validators.email]],
      language: [this.currentLanguage(), Validators.required],
    });
  }

  protected onLanguageChange(languageCode: string): void {
    this.languageService.changeLanguage(languageCode);
    this.settingsForm.patchValue({ language: languageCode });
  }

  protected onSaveSettings(): void {
    if (this.settingsForm.valid) {
      this.isSaving.set(true);

      // Simulate API call
      setTimeout(() => {
        console.log('Settings saved:', this.settingsForm.value);
        this.isSaving.set(false);
      }, 1000);
    }
  }

  protected getFieldError(fieldName: string): string {
    const field = this.settingsForm.get(fieldName);

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
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      language: 'Language',
    };
    return labels[fieldName] || fieldName;
  }
}
