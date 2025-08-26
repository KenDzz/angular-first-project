import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/guards/auth-guard';

export const analyticsRoutes: Routes = [
  {
    path: 'analytics',
    loadComponent: () =>
      import('./dashboard/analytics-dashboard').then((m) => m.AnalyticsDashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports').then((m) => m.ReportsComponent),
    canActivate: [authGuard],
  },
];
