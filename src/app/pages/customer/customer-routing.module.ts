import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ReviewComponent } from './components/review/review.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'order-details/:orderId', component: OrderDetailsComponent },
  { path: 'review/:productId', component: ReviewComponent },
  { path: 'product-details/:productId', component: ProductDetailsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
