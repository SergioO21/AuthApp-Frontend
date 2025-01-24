import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardLayoutComponent } from "./layouts";

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
