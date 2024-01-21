import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TOKEN = 'kmart-token';
const USER = 'kmart-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor(private http: HttpClient) {}

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public saveExpirationDate(expirationDate: string): void {
    window.localStorage.setItem('expirationDate', expirationDate);
  }

  static getToken(): string {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    return JSON.parse(window.localStorage.getItem(USER));
  }

  static hasTokenExpired() {
    const user = this.getUser();
    if (user === null) {
      return true;
    }
    return user.expirationDate < new Date().toISOString();
  }

  static getUserId(): String {
    const user = this.getUser();
    if (user === null) {
      return null;
    }
    return user.userId;
  }

  static getUserRole(): String {
    const user = this.getUser();
    if (user === null) {
      return null;
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken === null) {
      return false;
    }
    const role = this.getUserRole();
    return role === 'ADMIN' && !this.hasTokenExpired();
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken === null) {
      return false;
    }
    const role = this.getUserRole();
    return role === 'CUSTOMER' && !this.hasTokenExpired();
  }

  static singOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
