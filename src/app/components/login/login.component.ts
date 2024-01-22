import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        'krishna@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['admin', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
   this.isLoading = true;
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        this.isLoading = false;
        if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('/admin/dashboard');
        } else if (UserStorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl('/customer/dashboard');
        }
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Bad credntials', 'ERROR', {
          duration: 5000,
        });
      }
    );
  }
}
