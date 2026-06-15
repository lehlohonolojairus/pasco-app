import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDialogService } from '../modal-dialog/modal-dialog.service';
import { CreateSchoolRequest } from '../../schools/school.model';

@Component({
  selector: 'pasco-create-school-dialog',
  templateUrl: './create-school-dialog.html',
  styleUrls: ['./create-school-dialog.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateSchoolDialog {
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(ModalDialogService);

  readonly form = this.fb.group({
    name: ['', Validators.required],
    headOfficeEmailAddress: ['', [Validators.required, Validators.email]],
    headOfficeTelephoneNumber: ['', Validators.required],
    website: [''],
    logoUrl: [''],
  });

  constructor() {
    this.modalService.setFormValid(this.form.valid);

    this.form.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.modalService.setFormValid(this.form.valid);
    });
  }

  markAllAsTouched(): void {
    this.form.markAllAsTouched();
    this.modalService.setFormValid(this.form.valid);
  }

  public getPayload(): CreateSchoolRequest | null {
    if (this.form.invalid) {
      return null;
    }

    const value = this.form.getRawValue();

    return {
      name: value.name ?? '',
      headOfficeEmailAddress: value.headOfficeEmailAddress ?? '',
      headOfficeTelephoneNumber: value.headOfficeTelephoneNumber ?? '',
      website: value.website || null,
      logoUrl: value.logoUrl || null,
    };
  }
}