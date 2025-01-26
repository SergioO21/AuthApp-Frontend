import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services";
import Swal from "sweetalert2";

@Component({
  templateUrl: "./login-page.component.html",
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  myForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  login() {
    const { email, password } = this.myForm.value;

    this.authService.login({ email, password }).subscribe({
      next: () => this.router.navigateByUrl("/dashboard"),
      error: (errorMessage) => {
        void Swal.fire("Error", errorMessage, "error");
      },
    });

    this.myForm.reset();
  }
}
