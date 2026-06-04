import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationState {
  pageTitle = signal<string>('Dashboard');
}
