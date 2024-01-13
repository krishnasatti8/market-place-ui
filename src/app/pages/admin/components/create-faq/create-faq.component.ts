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
  faqForm:FormGroup;

  constructor(
    private adminServiceService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.faqForm = this.fb.group({
      question: [null,Validators.required],
      answer: [null,Validators.required],
    });
  }

  onSubmit() {
    if (this.faqForm.invalid) {
      return;
    }
    this.adminServiceService.postFAQ(this.productId,this.faqForm.value,).subscribe(
      (response: any) => {
        if(response.id!=null){
          this.snackBar.open('FAQ created successfully', 'Close', {
            duration: 5000,
          });
          this.router.navigate(['/admin/dashboard']);
        }
      },
      (error) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 5000,
        });
      }
    );
  }
}
