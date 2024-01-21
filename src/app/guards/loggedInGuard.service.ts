import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserStorageService } from '../services/storage/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuardService implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (UserStorageService.isAdminLoggedIn()) {
      this.router.navigateByUrl('/admin/dashboard');
      return false;
    } else if (UserStorageService.isCustomerLoggedIn()) {
      this.router.navigateByUrl('/customer/dashboard');
      return false;
    } else {
      return true;
    }
  }
}
