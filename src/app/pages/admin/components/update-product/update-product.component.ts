import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  categories: any = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  productId: number = +this.route.snapshot.params['productId'];
  existingImage: string | null = null;
  imageChanged: boolean = false;
  isLoading = false;

  constructor(
    private adminServiceService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.getAllCategories();
    this.getProductById();
  }

  onFileSelected(event: any) {
    this.imageChanged = true;
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
    this.existingImage = null;
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

  getProductById() {
    this.isLoading = true;
    this.adminServiceService.getProductById(this.productId).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.productForm.patchValue(res);
        this.existingImage = 'data:image/jpeg;base64,' + res.byteImage;
      },
      (error) => {
        this.isLoading = false;
        this.router.navigateByUrl('/admin/dashboard');
      }
    );
  }

  updateProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();

      if (this.imageChanged && this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );

      this.isLoading = true;
      this.adminServiceService
        .updateProduct(this.productId, formData)
        .subscribe(
          (res: any) => {
            this.isLoading = false;
            if (res.id != null) {
              this.snackBar.open('Product Updated Successfully', 'Close', {
                duration: 5000,
              });
              this.router.navigateByUrl('/admin/dashboard');
            }
          },
          (error) => {
            this.isLoading = false;
            this.router.navigateByUrl('/admin/dashboard');
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
