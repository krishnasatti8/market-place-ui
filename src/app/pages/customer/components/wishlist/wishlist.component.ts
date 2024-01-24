import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  products: any = [];
  isLoading = false;

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getWishlist();
  }

  getWishlist() {
    this.isLoading = true;
    this.customerService.getWislistByUserId().subscribe(
      (res: any) => {
        console.log(res);
        this.isLoading = false;
        res.forEach((element: any) => {
          element.processedImage =
            'data:image/jpeg;base64,' + element.returnedImg;
          this.products.push(element);
        });
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something Went Wrong', 'Close', {
          duration: 5000,
        });
      }
    );
  }

  removeFromWishlist(productId: any) {
    const wishlistDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };

    this.isLoading = true;
    this.customerService.removeFromWishlist(wishlistDto).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.products = [];
        this.getWishlist();
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something Went Wrong', 'Close', {
          duration: 5000,
        });
      }
    );
  }

  moveToCart(productId: any) {
    this.isLoading = true;
    this.customerService.addToCart(productId).subscribe(
      (res) => {
        this.isLoading = false;
        this.snackBar.open('Added to cart', 'SUCCESS', {
          duration: 5000,
        });
        this.removeFromWishlist(productId);
        this.router.navigateByUrl('/customer/cart');
      },
      (error) => {
        this.isLoading = false;
        if (error.status === 409) {
          this.snackBar.open('Product already in cart', 'Close', {
            duration: 5000,
          });
          return;
        } else {
          this.isLoading = false;
          this.snackBar.open('Added to cart ', 'OK', {
            duration: 5000,
          });
          this.removeFromWishlist(productId);
          this.router.navigateByUrl('/customer/cart');
        }
      }
    );
  }
}
