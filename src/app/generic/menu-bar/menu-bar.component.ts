import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartCountService } from 'src/app/pages/customer/services/cart-count.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  cartCount: number = 0;

  constructor(
    private router: Router,
    private cartCountService: CartCountService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    });
    this.cartCountService.getCartCount();
    this.cartCountService.cartCount.subscribe((count) => {
      this.cartCount = count;
    });
  }

  logOut() {
    UserStorageService.singOut();
    this.router.navigateByUrl('/login');
  }
}
