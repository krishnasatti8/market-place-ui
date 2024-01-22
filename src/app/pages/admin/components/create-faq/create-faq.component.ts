import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.component.html',
  styleUrls: ['./create-faq.component.scss'],
})
export class CreateFaqComponent implements OnInit {
  productId: number = this.activatedRoute.snapshot.params['productId'];
  faqForm: FormGroup;
  isLoading = false;

  constructor(
    private adminServiceService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.faqForm = this.fb.group({
      question: [null, Validators.required],
      answer: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.faqForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.adminServiceService
      .postFAQ(this.productId, this.faqForm.value)
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response.id != null) {
            this.snackBar.open('FAQ created successfully', 'OK', {
              duration: 5000,
            });
            this.router.navigate(['/admin/dashboard']);
          }
        },
        (error) => {
          this.isLoading=false;
          this.snackBar.open('Something went wrong', 'OK', {
            duration: 5000,
          });
        }
      );
  }
}
