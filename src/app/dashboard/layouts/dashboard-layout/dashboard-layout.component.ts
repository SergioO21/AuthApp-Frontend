import { Component, computed, inject } from "@angular/core";

import { AuthService } from "../../../auth/services";

@Component({
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"],
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);

  user = computed(() => this.authService.currentUser());

  onLogout() {
    this.authService.logout();
  }
}
