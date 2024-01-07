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

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchForm = this.fb.group({
      search: [null, Validators.required],
    });
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe((res: any) => {
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
    this.adminService.getAllProductsByName(title).subscribe((res: any) => {
      res.forEach((element: any) => {
        element.processedImage = `data:image/jpeg;base64,${element.byteImage}`;
        this.products.push(element);
      });
    });
  }
  deleteProduct(id: any) {
    this.adminService.deleteProduct(id).subscribe((res: any) => {
      if(res){
        this.snackBar.open('Product deleted successfully', 'Close', {
          duration: 5000,
        })
        this.getAllProducts();
      }else{ 
        this.snackBar.open('Error deleting product', 'Close', {
          duration: 5000,
        })
      }
    });
  }
}
