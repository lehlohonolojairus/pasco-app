import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Config } from '../config';
import { ApiResponse } from '../models/api-response';

export interface LoginPayload {
  userName: string;
  password: string;
}

const TOKEN_KEY = 'pasco_access_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<ApiResponse<string>> {
    return this.http
      .post<ApiResponse<string>>(Config.users.login, payload)
      .pipe(
        tap((res) => {
          if (res.isSuccess && res.data) {
            localStorage.setItem(TOKEN_KEY, res.data);
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}