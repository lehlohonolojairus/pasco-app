import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

export interface TokenClaims {
  name: string;
  role: string | string[];
  sub: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {
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

  getRoles(): string {
    const roles = this.decodeToken()?.role;
    if (!roles) return '';
    return Array.isArray(roles) ? roles.join(', ') : roles;
  }
}