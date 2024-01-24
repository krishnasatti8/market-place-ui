import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  products: any = [];
  isLoading = false;

  constructor(
    private CustomerService: CustomerService,
    private sanckBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getWishlist();
  }

  getWishlist() {
    this.isLoading = true;
    this.CustomerService.getWislistByUserId().subscribe(
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
        this.sanckBar.open('Something Went Wrong', 'Close', {
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
    this.CustomerService.removeFromWishlist(wishlistDto).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.products = [];
        this.getWishlist();
      },
      (error) => {
        this.isLoading = false;
        this.sanckBar.open('Something Went Wrong', 'Close', {
          duration: 5000,
        });
      }
    );
  }
}
