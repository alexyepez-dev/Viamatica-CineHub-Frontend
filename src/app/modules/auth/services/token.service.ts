import { Injectable } from '@angular/core';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token = 'token';

  getToken = () => localStorage.getItem(this.token) ?? "We're sorry, token is required.";

  setToken = (model: AuthResponse) => localStorage.setItem(this.token, model.token);

  decodeToken = (token: string) => {
    const format = token.split('.');

    if (!token) return null;

    if (format.length !== 3) return null;

    return JSON.parse(atob(format[1]));
  };

  logout = () => localStorage.removeItem(this.token);

  youAreLoggedIn = () => localStorage.getItem(this.token) ? true : false;
}
