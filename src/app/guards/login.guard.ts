import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  
  const logado = LoginService.tokenValido();
  if (logado) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
