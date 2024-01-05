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

  static getToken(): string {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    return JSON.parse(window.localStorage.getItem(USER));
  }

  static getUserId(): String {
    const user = this.getUser();
    if (user === null) {
      return null;
    }
    return user.id;
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
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken === null) {
      return false;
    }
    const role = this.getUserRole();
    return role === 'CUSTOMER';
  }

  static singOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
