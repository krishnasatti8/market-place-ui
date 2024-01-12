import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASE_URL = 'http://localhost:8080';
const TOKEN = 'kmart-token';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  createCategory(category: any) {
    return this.http.post(`${BASE_URL}/api/admin/createcategory`, category, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCategories() {
    return this.http.get(`${BASE_URL}/api/admin/categories`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createProduct(product: any) {
    return this.http.post(`${BASE_URL}/api/admin/createproduct`, product, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProducts() {
    return this.http.get(`${BASE_URL}/api/admin/products`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getAllProductsByName(search: any) {
    return this.http.get(`${BASE_URL}/api/admin/search/${search}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteProduct(id: any) {
    return this.http.delete(`${BASE_URL}/api/admin/product/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createCoupon(coupon: any) {
    return this.http.post(`${BASE_URL}/api/admin/createcoupon`, coupon, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCoupons() {
    return this.http.get(`${BASE_URL}/api/admin/coupons`, {
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
