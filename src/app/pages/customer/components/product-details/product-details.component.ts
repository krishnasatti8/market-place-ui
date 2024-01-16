import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

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
    this.customerService.getProductDetails(this.productId).subscribe(
      (res: any) => {
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
        this.snackBar.open('Internal Error', 'close', {
          duration: 5000,
        });
      }
    );
  }
}
