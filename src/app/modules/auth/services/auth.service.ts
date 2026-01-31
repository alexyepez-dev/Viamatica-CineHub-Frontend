import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Login } from '@auth/interfaces/login.interface';
import { environment } from '@envs/environment.development';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { TokenService } from '@auth/services/token.service';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { Register } from '@auth/interfaces/register.interface';
import { AuthStatus } from '@auth/types/auth-status.type';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;
  private tokenService = inject(TokenService);
  private _authStatus = signal<AuthStatus>('checking');
  private _username = signal<string | null>(null);
  private _token = signal<string | null>(this.tokenService.getToken());

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._username()) return 'authenticated';
    return 'no-authenticated';
  });

  username = computed<string | null>(() => this._username());
  token = computed<string | null>(() => this._token());

  login = (credentials: Login): Observable<boolean> =>
    this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error)),
    );

  register = (credentials: Register) =>
    this.http.post<Register>(`${this.baseUrl}/auth/register/`, credentials);

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${this.baseUrl}/auth/check-status`).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error)),
    );
  }

  logout = () => {
    this._username.set(null);
    this._token.set(null);
    this._authStatus.set('no-authenticated');

    localStorage.removeItem('token');
  };

  private handleAuthSuccess = ({ token, username }: AuthResponse) => {
    this._username.set(username);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  };

  private handleAuthError = (error: any) => {
    this.logout();
    return of(false);
  };
}
