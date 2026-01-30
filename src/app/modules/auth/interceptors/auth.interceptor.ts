import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@auth/services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);

  if(tokenService.youAreLoggedIn()) return next(req.clone({
    headers: req.headers.append("Authorization", `Bearer ${tokenService.getToken()}`)
  }))

  return next(req);
};
