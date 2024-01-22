import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  searchForm: FormGroup;
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchForm = this.fb.group({
      search: [null],
    });
  }

  getAllProducts() {
    this.products = [];
    this.isLoading = true;
    this.adminService.getAllProducts().subscribe(
      (res: any) => {
        this.isLoading = false;
        res.forEach((element: any) => {
          element.processedImage = `data:image/jpeg;base64,${element.byteImage}`;
          this.products.push(element);
        });
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong!', 'OK', {
          duration: 5000,
        });
      }
    );
    console.log(this.products);
  }

  searchProducts() {
    this.products = [];
    const title = this.searchForm.get('search')?.value;

    if (title === '' || title === null) {
      this.getAllProducts();
      return;
    }
    this.isLoading = true;
    this.adminService.getAllProductsByName(title).subscribe(
      (res: any) => {
        this.isLoading = false;
        res.forEach((element: any) => {
          element.processedImage = `data:image/jpeg;base64,${element.byteImage}`;
          this.products.push(element);
        });
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong!', 'OK', {
          duration: 5000,
        });
      }
    );
  }
  deleteProduct(id: any) {
    this.isLoading = true;
    this.adminService.deleteProduct(id).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res) {
          this.snackBar.open('Product deleted successfully', 'Close', {
            duration: 5000,
          });
          this.getAllProducts();
        }
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong!', 'OK', {
          duration: 5000,
        });
      }
    );
  }
}
