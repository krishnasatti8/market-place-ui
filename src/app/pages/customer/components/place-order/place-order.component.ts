import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  orderForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dilog: MatDialog
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      address: [null, Validators.required],
      orderDescription: [null],
    });
  }

  placeOrder() {
    this.customerService
      .placeOrder(this.orderForm.value)
      .subscribe((res: any) => {
        if (res.id != null) {
          this.snackBar.open('Order Placed Successfully', 'close', {
            duration: 5000,
          });
          this.closeForm();
          this.router.navigate(['/customer/my-orders']);
        } else {
          this.snackBar.open('Something went wrong', 'close', {
            duration: 5000,
          });
        }
      });
  }

  closeForm() {
    this.dilog.closeAll();
  }
}
