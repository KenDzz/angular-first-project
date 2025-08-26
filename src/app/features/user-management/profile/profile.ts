import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AuthService } from '../../../core/auth/services/auth-store';
import { ButtonComponent } from '../../../shared/components/button/button';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-profile',
  imports: [ButtonComponent, DatePipe, TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly user = this.authService.user;

  protected onEditProfile(): void {
    // Navigate to profile edit
    console.log('Edit profile');
  }

  protected onChangePassword(): void {
    // Navigate to change password
    console.log('Change password');
  }
}
