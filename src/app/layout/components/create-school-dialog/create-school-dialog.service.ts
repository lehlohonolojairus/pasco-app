import { Injectable, signal } from '@angular/core';
import { CreateSchoolRequest } from '../../schools/school.model';

@Injectable({
  providedIn: 'root',
})
export class CreateSchoolDialogService {
  private readonly _isOpen = signal(false);

  private resolver: ((value: CreateSchoolRequest | null) => void) | null = null;

  readonly isOpen = this._isOpen.asReadonly();

  open(): Promise<CreateSchoolRequest | null> {
    this._isOpen.set(true);

    return new Promise<CreateSchoolRequest | null>((resolve) => {
      this.resolver = resolve;
    });
  }

  submit(payload: CreateSchoolRequest): void {
    this.resolver?.(payload);
    this.reset();
  }

  cancel(): void {
    this.resolver?.(null);
    this.reset();
  }

  private reset(): void {
    this.resolver = null;
    this._isOpen.set(false);
  }
}