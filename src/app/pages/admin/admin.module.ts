import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateCouponComponent } from './components/create-coupon/create-coupon.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CreateFaqComponent } from './components/create-faq/create-faq.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CreateCategoryComponent,
    CreateProductComponent,
    CreateCouponComponent,
    CouponsComponent,
    OrdersComponent,
    CreateFaqComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ]
})
export class AdminModule { }
