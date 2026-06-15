import { Injectable, signal, Type } from '@angular/core';

export interface ModalConfig {
  title: string;
  icon?: string;
  hideSaveButton?: boolean;
  cancelButtonText?: string;
  component: Type<any>;
  onSave?: (event: any) => void;
  done?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ModalDialogService {
  private _isOpen = signal(false);
  private _config = signal<ModalConfig | null>(null);
  private _isFormValid = signal(true);

  isOpen = this._isOpen.asReadonly();
  config = this._config.asReadonly();
  isFormValid = this._isFormValid.asReadonly();

  open(config: ModalConfig): void {
    this._config.set(config);
    this._isFormValid.set(true);
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
    this._config.set(null);
    this._isFormValid.set(true);
  }

  setFormValid(valid: boolean): void {
    this._isFormValid.set(valid);
  }
}
