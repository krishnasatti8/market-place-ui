import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartCountService {
  cartCount = new Subject<number>();
  constructor(private customerService: CustomerService) {}

  async getCartCount() {
    const count = await this.customerService.getCartCount().toPromise();
    if (isNaN(+count)) {
      this.cartCount.next(0);
    } else {
      this.cartCount.next(+count);
    }
  }
}
