import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  order: any;

  couponForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dilog: MatDialog
  ) {}

  ngOnInit() {
    this.couponForm = this.fb.group({
      code: [null,Validators.required],
    });
    this.getCart();
  }

  getCart() {
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe((res: any) => {
      this.order = res;
      console.log(res);
      res.cartItemDtos.forEach((element: any) => {
        element.processedImage = `data:image/jpeg;base64,${element.returnedImg}`;
        this.cartItems.push(element);
      });
    });
  }

  applyCoupon() {
    const code = this.couponForm.get('code')?.value;

    if (code == null || code == '') {
      this.snackBar.open('Please enter a coupon code', 'close', {
        duration: 2000,
      });
      return;
    }

    this.customerService.applyCoupon(this.couponForm.value.code).subscribe(
      (res: any) => {
        this.snackBar.open('Coupon Applied Successfully', 'close', {
          duration: 2000,
        });
        this.getCart();
      },
      (error) => {
        this.snackBar.open(error.error, 'close', {
          duration: 2000,
        });
      }
    );
  }

  increaseQuantity(productId: any) {
    this.customerService.increaseProductQuantity(productId).subscribe(
      (res: any) => {
        this.snackBar.open('Product Quantity Increased', 'close', {
          duration: 5000,
        });
        this.getCart();
      },
      (error) => {
        this.snackBar.open("Error", 'close', {
          duration: 2000,
        });
      }
    );
  }

  decreaseQuantity(productId: any) {
    this.customerService.decreaseProductQuantity(productId).subscribe(
      (res: any) => {
        this.snackBar.open('Product Quantity Decreased', 'close', {
          duration: 5000,
        });
        this.getCart();
      },
      (error) => {
        this.snackBar.open("Error", 'close', {
          duration: 2000,
        });
      }
    );
  }
  placeOrder() {
    this.dilog.open(PlaceOrderComponent, {
      width: '500px',
      height: 'auto',
    })
  }
}
