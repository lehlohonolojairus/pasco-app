import {
  Component,
  inject,
  viewChild,
  ViewContainerRef,
  effect,
  ComponentRef,
} from '@angular/core';
import { ModalDialogService } from './modal-dialog.service';

@Component({
  selector: 'pasco-modal-dialog',
  standalone: false,
  templateUrl: './modal-dialog.component.html',
})
export class ModalDialogComponent {
  protected modalService = inject(ModalDialogService);

  contentHost = viewChild('contentHost', { read: ViewContainerRef });

  isLoading = false;

  private activeComponentRef: ComponentRef<any> | null = null;

  constructor() {
    effect(() => {
      const config = this.modalService.config();
      const host = this.contentHost();

      if (config?.component && host) {
        host.clear();
        this.activeComponentRef = host.createComponent(config.component);
      } else if (!config && host) {
        host.clear();
        this.activeComponentRef = null;
      }
    });
  }

  handleSave(event: any): void {
    const instance = this.activeComponentRef?.instance;
    if (instance && typeof instance.submit === 'function') {
      instance.submit();
    } else {
      this.modalService.config()?.onSave(event);
      this.modalService.close();
    }
  }

  handleCancel(): void {
    this.modalService.close();
  }
}