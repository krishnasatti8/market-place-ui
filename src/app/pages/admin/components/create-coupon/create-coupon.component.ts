import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss'],
})
export class CreateCouponComponent implements OnInit {
  couponForm: FormGroup;
  date = new Date();
  isLoading = false;

  constructor(
    private adminServiceService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.couponForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      discount: [null, Validators.required],
      expiryDate: [null, Validators.required],
    });
  }

  addCoupon() {
    if (this.couponForm.valid) {
      this.isLoading = true;
      this.adminServiceService.createCoupon(this.couponForm.value).subscribe(
        (res: any) => {
          this.isLoading = false;
          if (res.id !== null) {
            this.snackBar.open('Coupon Created Successfully', '', {
              duration: 5000,
            });
            this.router.navigate(['/admin/coupons']);
          }
        },
        (error) => {
          this.isLoading = false;
          this.snackBar.open('Something went wrong', '', {
            duration: 5000,
          });
        }
      );
    } else {
      this.couponForm.markAllAsTouched();
    }
  }
}
