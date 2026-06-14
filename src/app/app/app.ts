import { Component, signal } from '@angular/core';

@Component({
  selector: 'pasco-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: false,
})
export class App {
  protected readonly title = signal('pasco-app');
}
