import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  categories: any = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isLoading = false;

  constructor(
    private adminServiceService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: ['HRX', Validators.required],
      price: [999, Validators.required],
      description: ['Tshirt', Validators.required],
    });

    this.getAllCategories();
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  getAllCategories() {
    this.isLoading = true;
    this.adminServiceService.getAllCategories().subscribe(
      (res) => {
        this.isLoading = false;
        this.categories = res;
      },
      (error) => {
        this.isLoading = false;
        this.router.navigateByUrl('/admin/dashboard');
      }
    );
  }

  addProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );
      formData.append('image', this.selectedFile);

      this.isLoading = true;
      this.adminServiceService.createProduct(formData).subscribe(
        (res: any) => {
          if (res.id != null) {
            this.isLoading = false;
            this.snackBar.open('Product Created Successfully', 'Close', {
              duration: 5000,
            });
            this.router.navigateByUrl('/admin/dashboard');
          }
        },
        (error) => {
          this.isLoading = false;
          this.snackBar.open('Something went wrong!', 'OK', {
            duration: 5000,
          });
        }
      );
    } else {
      for (const key in this.productForm.controls) {
        if (this.productForm.controls.hasOwnProperty(key)) {
          this.productForm.controls[key].markAsTouched();
        }
      }
    }
  }
}
