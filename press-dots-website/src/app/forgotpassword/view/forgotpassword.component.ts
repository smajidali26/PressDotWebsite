import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../service/forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _forgotPasswordService: ForgotPasswordService
  ) {}
  forgotPasswordForm: FormGroup;
  submitted = false;

  errorMessage: string = '';
  successMessage: boolean = false;

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    this.submitted = true;
    this._forgotPasswordService.forgotPassword(this.email.value).subscribe(
      (response) =>
        response == true
          ? (this.successMessage = true)
          : (this.successMessage = false),
      (error) => (this.errorMessage = error)
    );
  }
}
