import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isLogin = authService.isLogin.getValue();
  const router = inject(Router);
  // !!! true || false

  if(!isLogin) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
