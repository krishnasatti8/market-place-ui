import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASE_URL = 'http://localhost:8080';
const TOKEN = 'kmart-token';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${BASE_URL}/api/customer/products`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getAllProductsByName(search: any) {
    return this.http.get(`${BASE_URL}/api/customer/search/${search}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addToCart(productId: any) {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };

    return this.http.post(`${BASE_URL}/api/customer/addtocart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCartByUserId() {
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASE_URL}/api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  applyCoupon(code: string) {
    const userId = UserStorageService.getUserId();
    return this.http.get(
      `${BASE_URL}/api/customer/applycoupon/${userId}/${code}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  increaseProductQuantity(productId: string) {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };

    return this.http.post(`${BASE_URL}/api/customer/addition`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  decreaseProductQuantity(productId: string) {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };

    return this.http.post(`${BASE_URL}/api/customer/deduction`, cartDto, {
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
