import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '@auth/interfaces/login.interface';
import { environment } from '@envs/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;

  login = (credentials: Login) => this.http.post<Login>(`${this.baseUrl}/auth/login`, credentials);
}