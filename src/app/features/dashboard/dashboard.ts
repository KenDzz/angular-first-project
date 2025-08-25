import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonComponent, DatePipe, LanguageSwitcherComponent, TranslatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly user = this.authService.user;

  protected onLogout(): void {
    this.authService.logout();
  }
}
