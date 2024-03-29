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

  removeCoupon() {
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASE_URL}/api/customer/removecoupon/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
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

  removeFromCart(productId: string) {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };

    return this.http.post(`${BASE_URL}/api/customer/removefromcart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  placeOrder(orderDto: any) {
    orderDto.userId = UserStorageService.getUserId();
    return this.http.post(`${BASE_URL}/api/customer/placeorder`, orderDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrders() {
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASE_URL}/api/customer/myorders/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrderDetails(orderId: any) {
    return this.http.get(`${BASE_URL}/api/customer/orderdetails/${orderId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createReview(reviewDto: any) {
    return this.http.post(`${BASE_URL}/api/customer/createreview`, reviewDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductDetails(productId: any) {
    return this.http.get(
      `${BASE_URL}/api/customer/productdetails/${productId}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  addToWishlist(wishlistDto: any) {
    return this.http.post(
      `${BASE_URL}/api/customer/addtowishlist`,
      wishlistDto,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  removeFromWishlist(wishlistDto: any) {
    return this.http.post(
      `${BASE_URL}/api/customer/removefromwishlist`,
      wishlistDto,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  getWislistByUserId() {
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASE_URL}/api/customer/fetchwishlist/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCartCount() {
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASE_URL}/api/customer/cartcount/${userId}`, {
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
