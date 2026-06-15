import { Injectable, signal } from '@angular/core';

export interface ConfirmationDialogConfig {
  message: string;
  icon?: string;
  isDeleteAction?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private readonly _isOpen = signal(false);
  private readonly _config = signal<ConfirmationDialogConfig | null>(null);

  private resolver: ((value: boolean) => void) | null = null;

  readonly isOpen = this._isOpen.asReadonly();
  readonly config = this._config.asReadonly();

  open(config: ConfirmationDialogConfig): Promise<boolean> {
    this._config.set(config);
    this._isOpen.set(true);

    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  confirm(): void {
    this.resolver?.(true);
    this.reset();
  }

  cancel(): void {
    this.resolver?.(false);
    this.reset();
  }

  private reset(): void {
    this.resolver = null;
    this._isOpen.set(false);
    this._config.set(null);
  }
}