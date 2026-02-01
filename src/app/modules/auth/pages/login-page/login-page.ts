import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toastSuccess } from '@shared/alerts/toast-success';
import { LoginForm } from '@auth/components/login-form/login-form';
import { Login } from '@auth/interfaces/login.interface';
import { AuthService } from '@auth/services/auth.service';
import { errorAlert } from '@shared/alerts/error-alert';

@Component({
  selector: 'login-page',
  imports: [LoginForm],
  template: ` <login-form (postForm)="onSubmit($event)" /> `,
})
export default class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit = (credentials: Login) =>
    this.authService.login(credentials).subscribe(async (isAuthenticated) => {
      if (isAuthenticated) {
        await toastSuccess(`Bienvenido ${credentials.username}`);
        this.router.navigateByUrl('/home/dashboard');
        return;
      }

      errorAlert('Credenciales inválidas o usuario no registrado');
    });
}
