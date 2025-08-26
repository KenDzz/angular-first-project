import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';
import { authRoutes } from './core/auth/auth.routes';
import { userManagementRoutes } from './features/user-management/user-management.routes';
import { analyticsRoutes } from './features/analytics/analytics.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  // Auth routes (non-business feature in core)
  ...authRoutes,

  // User Management routes (business feature)
  ...userManagementRoutes,

  // Analytics routes (business feature)
  ...analyticsRoutes,

  {
    path: '**',
    redirectTo: '/login',
  },
];
