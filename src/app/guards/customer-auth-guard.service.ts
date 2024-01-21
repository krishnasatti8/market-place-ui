import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserStorageService } from '../services/storage/user-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthGuardService implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (UserStorageService.isCustomerLoggedIn()) {
      return true;
    }
    this.snackBar.open('You are not allowed to access this page!', '', {
      duration: 2000,
    });
    return this.router.createUrlTree(['/login']);
  }
}
