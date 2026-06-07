import { Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';

export interface TokenClaims {
  name: string;
  email: string;
  ProfilePictureUrl: string | null;
  role: string | string[];
  sub: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  
  profilePictureUrl = signal<string | null>(null);

  constructor(private authService: AuthService) {}

  private decodeToken(): TokenClaims | null {
    const token = this.authService.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as TokenClaims;
    } catch {
      return null;
    }
  }

  getUserName(): string {
    return this.decodeToken()?.name ?? 'Unknown';
  }

  getUserEmail(): string {
    return this.decodeToken()?.email ?? 'Unknown';
  }

  getRoles(): string {
    const roles = this.decodeToken()?.role;
    if (!roles) return '';
    return Array.isArray(roles) ? roles.join(', ') : roles;
  }
  getToken = () => {
    return this.authService.getToken();
  };

  getProfilePicture(): string | null {
    const profilePictureUrl = this.decodeToken()?.ProfilePictureUrl ?? null;
    this.profilePictureUrl.set(profilePictureUrl);
    return profilePictureUrl;
  }
}
