import { Component, inject } from '@angular/core';
import { ApplicationState } from '../../services/application-state';

@Component({
  selector: 'pasco-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: false,
})
export class Header {
  appStateService = inject(ApplicationState);
  isOpen = false;

  toggleMenu = () => {
    this.isOpen = !this.isOpen;
  };
}
