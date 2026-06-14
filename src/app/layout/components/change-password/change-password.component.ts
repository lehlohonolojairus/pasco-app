import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../auth/user.service';
import { Config } from '../../../config';
import { ModalDialogService } from '../modal-dialog/modal-dialog.service';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const newPassword = control.get('newPassword')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return newPassword && confirmPassword && newPassword !== confirmPassword
    ? { passwordMismatch: true }
    : null;
}

@Component({
  selector: 'pasco-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private modalService = inject(ModalDialogService);
  private changeDetector = inject(ChangeDetectorRef);
  private userService = inject(UserService);

  private statusSub!: Subscription;

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  form = this.fb.group(
    {
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator },
  );

  get currentPassword() {
    return this.form.get('currentPassword');
  }
  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  ngOnInit(): void {
    this.modalService.setFormValid(false);

    this.statusSub = this.form.statusChanges.subscribe((status) => {
      this.modalService.setFormValid(status === 'VALID');
    });
  }

  ngOnDestroy(): void {
    this.statusSub?.unsubscribe();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.changeDetector.detectChanges();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      currentPassword: this.form.value.currentPassword,
      newPassword: this.form.value.newPassword,
      confirmPassword: this.form.value.confirmPassword,
      appName: 'PasCo_WebPortal',
      userName: this.userService.getUserEmail(),
    };

    this.http.post(Config.users.changePassword, payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Password changed successfully.';
        this.form.reset();
        setTimeout(() => this.modalService.close(), 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message ?? 'Failed to change password. Please try again.';
        this.changeDetector.detectChanges();
      },
    });
  }
}
