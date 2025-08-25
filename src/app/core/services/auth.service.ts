import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User, LoginRequest, RegisterRequest, AuthResponse, AuthState } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly apiUrl = 'http://localhost:3000/api/auth'; // Configure based on your API

  // Reactive state management with signals
  private readonly _authState = signal<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  // Public read-only computed signals
  readonly authState = this._authState.asReadonly();
  readonly user = computed(() => this._authState().user);
  readonly isAuthenticated = computed(() => this._authState().isAuthenticated);
  readonly isLoading = computed(() => this._authState().isLoading);
  readonly error = computed(() => this._authState().error);

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Skip localStorage access during SSR
    }

    const token = this.getStoredToken();
    const userData = this.getStoredUser();

    if (token && userData) {
      this._authState.update((state) => ({
        ...state,
        user: userData,
        token,
        isAuthenticated: true,
      }));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.setLoading(true);
    this.clearError();

    // For demo purposes, simulate API call
    // Replace with actual HTTP call: return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
    return this.simulateAuthResponse(credentials.email).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error) => this.handleAuthError(error))
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    this.setLoading(true);
    this.clearError();

    // For demo purposes, simulate API call
    // Replace with actual HTTP call: return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
    return this.simulateRegisterResponse(userData).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error) => this.handleAuthError(error))
    );
  }

  logout(): void {
    this.clearStorage();
    this._authState.set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.storeTokens(response.token, response.refreshToken);
    this.storeUser(response.user);

    this._authState.update((state) => ({
      ...state,
      user: response.user,
      token: response.token,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    }));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    this.setLoading(false);

    const errorMessage = error.error?.message || 'Authentication failed';

    this._authState.update((state) => ({
      ...state,
      error: errorMessage,
      isLoading: false,
    }));

    return throwError(() => new Error(errorMessage));
  }

  private setLoading(loading: boolean): void {
    this._authState.update((state) => ({ ...state, isLoading: loading }));
  }

  private clearError(): void {
    this._authState.update((state) => ({ ...state, error: null }));
  }

  private storeTokens(token: string, refreshToken: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  private storeUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }

  private getStoredToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private getStoredUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  private clearStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
    }
  }

  // Demo simulation methods - remove in production
  private simulateAuthResponse(email: string): Observable<AuthResponse> {
    return of({
      user: {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        createdAt: new Date(),
      },
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
    }).pipe(
      // Simulate network delay
      tap(() => setTimeout(() => {}, 1000))
    );
  }

  private simulateRegisterResponse(userData: RegisterRequest): Observable<AuthResponse> {
    return of({
      user: {
        id: Math.random().toString(36),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdAt: new Date(),
      },
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
    }).pipe(
      // Simulate network delay
      tap(() => setTimeout(() => {}, 1000))
    );
  }
}
