import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginPageComponent, RegisterPageComponent } from "./pages";
import { AuthLayoutComponent } from "./layouts";

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AuthLayoutComponent,
  ],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
