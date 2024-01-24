import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId: number = this.activatedRoute.snapshot.params['productId'];
  product: any;
  faqs: any[] = [];
  reviews: any[] = [];
  isLoading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails() {
    this.isLoading = true;
    this.customerService.getProductDetails(this.productId).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.product = res.productDto;
        this.product.processedImage =
          'data:image/jpeg;base64,' + this.product.byteImage;
        this.faqs = res.faqDtos;
        res.reviewDtos.forEach((review: any) => {
          review.processedImage = 'data:image/jpeg;base64,' + review.byteImage;
          this.reviews.push(review);
        });
      },
      (err) => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong!', 'OK', {
          duration: 5000,
        });
      }
    );
  }

  addToWishlist() {
    const wishlistDto = {
      productId: this.productId,
      userId: UserStorageService.getUserId(),
    };

    this.isLoading = true;

    this.customerService.addToWishlist(wishlistDto).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res.id != null) {
          this.snackBar.open('Product added to wishlist', 'close', {
            duration: 5000,
          });
          this.router.navigate(['/customer/wishlist']);
        } else {
          this.snackBar.open('Product already in wishlist', 'close', {
            duration: 5000,
          });
        }
      },
      (err) => {
        this.snackBar.open('Internal Error', 'close', {
          duration: 5000,
        });
      }
    );
  }
}
