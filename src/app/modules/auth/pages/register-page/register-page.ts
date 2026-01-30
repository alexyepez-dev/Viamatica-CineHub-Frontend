import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toastSuccess } from '@auth/alerts/login-success';
import { Register } from '@auth/interfaces/register.interface';
import { AuthService } from '@auth/services/auth.service';
import { RegisterForm } from '@auth/components/register-form/register-form';

@Component({
  selector: 'register-page',
  imports: [RegisterForm],
  template: `<register-form (postForm)="onSubmit($event)" />`,
})
export default class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit = (credentials: Register) =>
    this.authService.register(credentials).subscribe({
      next: (res) => {
        console.log(`Bienvenido ${credentials.username}`);
        toastSuccess('Registro exitoso. Inicia sesión').then(() =>
          this.router.navigateByUrl('/auth/login'),
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
}
