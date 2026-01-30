import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { TokenService } from '@auth/services/token.service';

export const authGuard: CanActivateFn = () => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  if(!tokenService.youAreLoggedIn()){
    router.navigate(["/home/not-found"]);

    return false;
  }

  return true;
};
