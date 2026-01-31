import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.checkStatus());

  if (!isAuthenticated) {
    router.navigateByUrl('/home/not-found');
    return false;
  }

  return true;
};
