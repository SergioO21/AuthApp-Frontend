import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

import { AuthService } from "../services";
import { AuthStatus } from "../enums";

export const isAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.Authenticated) {
    return true;
  }

  void router.navigateByUrl("auth/login");
  return false;
};
