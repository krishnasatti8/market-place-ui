import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  searchForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchForm = this.fb.group({
      search: [null, Validators.required],
    });
  }

  getAllProducts() {
    this.products = [];
    this.customerService.getAllProducts().subscribe((res: any) => {
      res.forEach((element: any) => {
        element.processedImage = `data:image/jpeg;base64,${element.byteImage}`;
        this.products.push(element);
      });
    });
    console.log(this.products);
  }

  searchProducts() {
    this.products = [];
    const title = this.searchForm.get('search')?.value;
    this.customerService.getAllProductsByName(title).subscribe((res: any) => {
      res.forEach((element: any) => {
        element.processedImage = `data:image/jpeg;base64,${element.byteImage}`;
        this.products.push(element);
      });
    });
  }

  addToCart(productId: any) {
    this.customerService.addToCart(productId).subscribe(
      (res) => {
        if (res) {
          this.snackBar.open('Added to cart', 'SUCCESS', {
            duration: 5000,
          });
          this.router.navigateByUrl('/customer/cart');
        }
      },
      (error) => {
  
        if (error.status === 409) {
          this.snackBar.open('Product already in cart', 'Close', {
            duration: 5000,
          });
          return;
        } else {
          this.snackBar.open('Something went wrong', 'ERROR', {
            duration: 5000,
          });
        }
      }
    );
  }
}
