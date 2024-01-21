import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
})
export class TrackOrderComponent implements OnInit {
  searchOrderForm: FormGroup;
  order:any;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.searchOrderForm = this.fb.group({
      trackingId: [null, Validators.required],
    });
  }

  submit() {
    const trackingId = this.searchOrderForm.controls['trackingId'].value;
    this.authService.getOrderByTrackingId(trackingId).subscribe((response) => {
      console.log(response);
      this.order = response;
    });
  }
}
