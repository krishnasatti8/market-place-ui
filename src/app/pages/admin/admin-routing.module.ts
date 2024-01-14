import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreateCouponComponent } from './components/create-coupon/create-coupon.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CreateFaqComponent } from './components/create-faq/create-faq.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'create-category',
    component: CreateCategoryComponent,
  },
  {
    path: 'create-product',
    component: CreateProductComponent,
  },
  {
    path: 'update-product/:productId',
    component: UpdateProductComponent,
  },
  {
    path: 'create-coupon',
    component: CreateCouponComponent,
  },
  {
    path: 'coupons',
    component: CouponsComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'faq/:productId',
    component: CreateFaqComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
