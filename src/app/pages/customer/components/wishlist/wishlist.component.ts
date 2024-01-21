import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  products: any = [];

  constructor(private CustomerService: CustomerService) {}

  ngOnInit() {
    this.getWishlist();
  }

  getWishlist() {
    this.CustomerService.getWislistByUserId().subscribe((res: any) => {
      console.log(res);
      
      res.forEach((element: any) => {
        element.processedImage =
          'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
      });
    });
  }
}
