import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layouts";
import { LoginPageComponent, RegisterPageComponent } from "./pages";

const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginPageComponent,
      },
      {
        path: "register",
        component: RegisterPageComponent,
      },
      {
        path: "**",
        redirectTo: "login",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
