import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private adminServiceService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ["Clothes", Validators.required],
      description: ["clothes", Validators.required],
    });
  }

  onSubmit() {
    this.adminServiceService
      .createCategory(this.categoryForm.value)
      .subscribe((res: any) => {
        if (res.id != null) {
          this.snackBar.open('Category created successfully', 'Ok', {
            duration: 5000,
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 5000,
          });
        }
      });
  }
}
