import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '@auth/interfaces/login.interface';
import { environment } from '@envs/environment.development';
import { tap } from 'rxjs';
import { TokenService } from '@auth/services/token.service';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { Register } from '@auth/interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;
  private tokenService = inject(TokenService);

  login = (credentials: Login) =>
    this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials)
      .pipe(tap((res) => this.tokenService.setToken(res)));

  register = (credentials: Register) => this.http.post<Register>(`${this.baseUrl}/auth/register/`, credentials)
}
