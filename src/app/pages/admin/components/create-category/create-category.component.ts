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
  isLoading = false;

  constructor(
    private adminServiceService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.adminServiceService.createCategory(this.categoryForm.value).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res.id != null) {
          this.snackBar.open('Category created successfully', 'OK', {
            duration: 5000,
          });
          this.router.navigateByUrl('/admin/dashboard');
        }
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Something went wrong!', 'OK', {
          duration: 5000,
        });
      }
    );
  }
}
