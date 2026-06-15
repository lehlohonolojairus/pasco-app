import { Component, HostListener, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateSchoolDialogService } from './create-school-dialog.service';
import { CreateSchoolRequest } from '../../schools/school.model';

@Component({
  selector: 'pasco-create-school-dialog',
  templateUrl: './create-school-dialog.html',
  styleUrls: ['./create-school-dialog.scss'],
  standalone: false,
})
export class CreateSchoolDialog {
  private readonly fb = inject(FormBuilder);
  readonly dialog = inject(CreateSchoolDialogService);

  readonly form = this.fb.group({
    name: ['', Validators.required],
    headOfficeEmailAddress: ['', [Validators.required, Validators.email]],
    headOfficeTelephoneNumber: ['', Validators.required],
    website: [''],
    logoUrl: [''],
  });

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.dialog.isOpen()) {
      this.cancel();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cancel();
    }
  }

  cancel(): void {
    this.form.reset({
      name: '',
      headOfficeEmailAddress: '',
      headOfficeTelephoneNumber: '',
      website: '',
      logoUrl: '',
    });
    this.dialog.cancel();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: CreateSchoolRequest = {
      name: value.name ?? '',
      headOfficeEmailAddress: value.headOfficeEmailAddress ?? '',
      headOfficeTelephoneNumber: value.headOfficeTelephoneNumber ?? '',
      website: value.website || null,
      logoUrl: value.logoUrl || null,
    };

    this.form.reset({
      name: '',
      headOfficeEmailAddress: '',
      headOfficeTelephoneNumber: '',
      website: '',
      logoUrl: '',
    });

    this.dialog.submit(payload);
  }
}