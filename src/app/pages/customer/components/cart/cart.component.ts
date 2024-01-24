import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { CartCountService } from '../../services/cart-count.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  order: any;
  isLoading = false;

  couponForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dilog: MatDialog,
    private cartCountService: CartCountService
  ) {}

  ngOnInit() {
    this.couponForm = this.fb.group({
      code: [null],
    });
    this.getCart();
  }

  getCart() {
    this.cartItems = [];
    this.isLoading = true;
    this.customerService.getCartByUserId().subscribe(
      (res: any) => { 
        this.cartCountService.getCartCount();
        this.isLoading = false;
        this.order = res;
        console.log(res);
        res.cartItemDtos.forEach((element: any) => {
          element.processedImage = `data:image/jpeg;base64,${element.returnedImg}`;
          this.cartItems.push(element);
        });
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong!', 'close', {
          duration: 2000,
        });
      }
    );
  }

  applyCoupon() {
    const code = this.couponForm.get('code')?.value;

    if (code == null || code == '') {
      this.snackBar.open('Please enter a coupon code', 'close', {
        duration: 2000,
      });
      return;
    }

    this.isLoading = true;
    this.customerService.applyCoupon(this.couponForm.value.code).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.couponForm.reset();
        this.snackBar.open('Coupon Applied Successfully', 'close', {
          duration: 2000,
        });
        this.getCart();
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Invalid Coupon', 'close', {
          duration: 2000,
        });
      }
    );
  }

  increaseQuantity(productId: any) {
    this.isLoading = true;
    this.customerService.increaseProductQuantity(productId).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.snackBar.open('Product Quantity Increased', 'close', {
          duration: 5000,
        });
        this.getCart();
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong!', 'close', {
          duration: 2000,
        });
      }
    );
  }

  decreaseQuantity(productId: any) {
    this.isLoading = true;
    this.customerService.decreaseProductQuantity(productId).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.snackBar.open('Product Quantity Decreased', 'close', {
          duration: 5000,
        });
        this.getCart();
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong!', 'close', {
          duration: 2000,
        });
      }
    );
  }

  removeFromCart(productId: any) {
    this.isLoading = true;
    this.customerService.removeFromCart(productId).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.snackBar.open('Product Removed From Cart', 'close', {
          duration: 5000,
        });
        this.getCart();
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong!', 'close', {
          duration: 2000,
        });
      }
    );
  }

  removeCoupon() {
    this.isLoading = true;
    this.customerService.removeCoupon().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.snackBar.open('Coupon Removed', 'close', {
          duration: 5000,
        });
        this.getCart();
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong!', 'close', {
          duration: 2000,
        });
      }
    );
  }

  placeOrder() {
    this.dilog.open(PlaceOrderComponent, {
      width: '500px',
      height: 'auto',
    });
  }
}
