import { Component, OnInit, signal, HostListener } from '@angular/core';
import { UserService } from '../../../auth/user.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pasco-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss'],
  standalone: false,
})
export class UserProfile implements OnInit {
  userName = signal('');
  userRole = signal('');
  menuOpen = signal(false);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName.set(this.userService.getUserName());
    this.userRole.set(this.userService.getRoles());
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-profile-menu')) {
      this.menuOpen.set(false);
    }
  }

  changePassword() {
    this.menuOpen.set(false);
    this.router.navigate(['/change-password']);
  }

  uploadProfilePicture() {
    this.menuOpen.set(false);
    // TODO: open file picker / dialog
  }

  linkSchool() {
    this.menuOpen.set(false);
    this.router.navigate(['/link-school']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
