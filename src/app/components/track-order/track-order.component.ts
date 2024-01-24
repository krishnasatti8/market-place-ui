import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
})
export class TrackOrderComponent implements OnInit {
  searchOrderForm: FormGroup;
  order: any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.searchOrderForm = this.fb.group({
      trackingId: [null],
    });
  }

  submit() {
    this.order = null;
    const trackingId = this.searchOrderForm.controls['trackingId'].value;

    if (!trackingId) {
      this.snackBar.open('Please enter a tracking ID', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.isLoading = true;
    this.authService.getOrderByTrackingId(trackingId).subscribe(
      (response) => {
        this.searchOrderForm.reset();
        this.isLoading = false;
        console.log(response);
        this.order = response;
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Invalid Tracking Id', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
