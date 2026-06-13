import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationState {
  public pageTitle = signal<string>('Dashboard');
}
