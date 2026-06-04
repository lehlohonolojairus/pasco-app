import { Component, signal, computed } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'pasco-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: false,
})
export class Login {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  isFormValid = computed(() => this.form.valid);

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.form.value;

    this.authService.login({ userName: email!, password: password! }).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.router.navigate(['/layout']);
        } else {
          this.errorMessage.set(res.message ?? 'Login failed.');
        }
      },
      error: () => {
        this.errorMessage.set('An unexpected error occurred.');
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  get emailControl() { return this.form.controls.email; }
  get passwordControl() { return this.form.controls.password; }
}