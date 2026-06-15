import { Component, HostListener, inject } from '@angular/core';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@Component({
  selector: 'pasco-confirmation-dialog',
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.scss'],
  standalone: false,
})
export class ConfirmationDialog {
  readonly dialog = inject(ConfirmationDialogService);

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.dialog.isOpen()) {
      this.dialog.cancel();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.dialog.cancel();
    }
  }

  confirm(): void {
    this.dialog.confirm();
  }

  cancel(): void {
    this.dialog.cancel();
  }
}