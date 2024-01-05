import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASE_URL = 'http://localhost:8080';
const TOKEN = 'kmart-token';

@Injectable({ providedIn: 'root' })
export class AdminServiceService {
  constructor(private http: HttpClient) {}

  createCategory(category: any) {
    return this.http.post(`${BASE_URL}/api/admin/createcategory`, category, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader() {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
