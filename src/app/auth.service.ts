import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'acces_token';
  private readonly USERID = 'sub'

  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  setUserId(sub: string): void {
    localStorage.setItem(this.USERID, sub)
  }

  getUserId() {
    localStorage.getItem(this.USERID)
  }
}
