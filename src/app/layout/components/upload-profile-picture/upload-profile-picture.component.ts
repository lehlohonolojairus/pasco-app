import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../auth/user.service';
import { ModalDialogService } from '../modal-dialog/modal-dialog.service';
import { Config } from '../../../config';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'pasco-upload-profile-picture',
  templateUrl: './upload-profile-picture.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class UploadProfilePictureComponent {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private modalService = inject(ModalDialogService);

  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  isUploading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      this.errorMessage.set('Only image files (JPEG, PNG, GIF, WEBP) are allowed.');
      this.selectedFile.set(null);
      this.previewUrl.set(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.errorMessage.set('File size must not exceed 2MB.');
      this.selectedFile.set(null);
      this.previewUrl.set(null);
      return;
    }

    this.errorMessage.set('');
    this.selectedFile.set(file);

    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  clearSelection() {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  upload() {
    if (!this.selectedFile()) return;

    this.isUploading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const formData = new FormData();
    formData.append('file', this.selectedFile()!);

    const token = this.userService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.post(Config.users.uploadProfilePicture, formData, { headers }).subscribe({
      next: (response: any) => {
        this.isUploading.set(false);
        this.successMessage.set('Profile picture uploaded successfully.');
        this.selectedFile.set(null);
        this.userService.profilePictureUrl.set(response.data!);
      },
      error: (err) => {
        this.isUploading.set(false);
        this.errorMessage.set(err?.error?.message ?? 'Upload failed. Please try again.');
      },
    });
  }
}
