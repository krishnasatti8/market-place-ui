import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  orderId: any = this.activatedRoute.snapshot.params['orderId'];
  orderedProducts=[];
  totalAmount: any;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.customerService.getOrderDetails(this.orderId).subscribe((res: any) => {
       res.productDtos.forEach(element=>{
        element.processedImg='data:image/jpeg;base64,'+element.byteImage
        this.orderedProducts.push(element);
       })
       this.totalAmount=res.orderAmount;
       console.log(this.orderedProducts);
    });
  }
}
