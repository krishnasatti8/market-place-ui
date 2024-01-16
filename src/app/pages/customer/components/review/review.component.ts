import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  productId: number = this.activatedRoute.snapshot.params['productId'];
  reviewForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null;
  ratings = [1, 2, 3, 4, 5];

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm() {
    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('rating', this.reviewForm.get('rating')?.value);
    formData.append('description', this.reviewForm.get('description')?.value);
    formData.append('productId', this.productId.toString());
    formData.append('userId', UserStorageService.getUserId().toString());

    this.customerService.createReview(formData).subscribe(
      (response: any) => {
        if (response.id != null) {
          this.snackBar.open('Review added successfully', 'Close', {
            duration: 5000,
          });
          this.router.navigate(['/customer/my-orders']);
        } else {
          this.snackBar.open('Something went wrong', 'Close', {
            duration: 5000,
          });
        }
      },
      (error: any) => {
        this.snackBar.open('Internal Error', 'Close', {
          duration: 2000,
        });
      }
    );
  }
}
