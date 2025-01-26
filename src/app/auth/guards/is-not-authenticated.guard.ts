import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

import { AuthService } from "../services";
import { AuthStatus } from "../enums";

export const isNotAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.Authenticated) {
    void router.navigateByUrl("dashboard");
    return false;
  }

  return true;
};
