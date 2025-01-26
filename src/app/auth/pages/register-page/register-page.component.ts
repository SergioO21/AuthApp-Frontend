import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services";
import Swal from "sweetalert2";

@Component({
  templateUrl: "./register-page.component.html",
})
export class RegisterPageComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  myForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    name: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  register() {
    const { name, email, password } = this.myForm.value;

    this.authService.register({ name, email, password }).subscribe({
      next: () => this.router.navigateByUrl("/dashboard"),
      error: (errorMessage) => {
        void Swal.fire("Error", String(errorMessage), "error");
      },
    });
  }
}
