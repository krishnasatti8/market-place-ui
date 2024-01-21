import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TrackOrderComponent } from './components/track-order/track-order.component';
import { CustomerAuthGuardService } from './guards/customer-auth-guard.service';
import { AdminAuthGuardService } from './guards/admin-auth-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoggedInGuardService } from './guards/loggedInGuard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuardService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoggedInGuardService],
  },
  {
    path: 'track-order',
    component: TrackOrderComponent,
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./pages/customer/customer.module').then((m) => m.CustomerModule),
    canActivate: [CustomerAuthGuardService],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminAuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
