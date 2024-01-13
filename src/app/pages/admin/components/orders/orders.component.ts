import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})

export class OrdersComponent implements OnInit {

  orders:any;
  
  constructor(
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) { 

  }

  ngOnInit() {
   this.getPlacedOrders();
  }

  getPlacedOrders() {
    this.adminService.getPlacedOrders().subscribe(
      (response: any) => {
        this.orders = response;
        console.log(this.orders);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateOrderStatus(orderId: any, status: any) {
    this.adminService.updateOrderStatus(orderId, status).subscribe(
      (response: any) => {
       if(response.id!=null){
        this.snackBar.open(`Order status updated to ${status}`, "Success", {
          duration: 5000
        });
        this.getPlacedOrders();
       }else{
        this.snackBar.open(`Something went  wrong!`, "Error", {
          duration: 5000
        });
       }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
