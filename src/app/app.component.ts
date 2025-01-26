import { Component, computed, effect, inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./auth/services";
import { AuthStatus } from "./auth/enums";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  finishedAuthCheck = computed(
    () => this.authService.authStatus() !== AuthStatus.Checking
  );

  authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.Checking:
        break;
      case AuthStatus.Authenticated:
        void this.router.navigateByUrl("dashboard");
        break;
      case AuthStatus.NotAuthenticated:
        void this.router.navigateByUrl("auth/login");
        break;
    }
  });
}
