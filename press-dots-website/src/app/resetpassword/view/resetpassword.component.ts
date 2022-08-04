import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from '../service/resetpassword.service';
import { resetPasswordRequest } from '../model/resetpassword';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute
  ) {}

  resetPasswordForm: FormGroup;
  submitted = false;
  errorMessage: string = '';
  successMessage: boolean = false;
  token: string = '';

  get password() {
    return this.resetPasswordForm.get('password');
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
    });
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }
  onSubmit() {
    this.submitted = true;
    let model = JSON.stringify(this.ResetPasswordModel());
    this._resetPasswordService.resetPasswordByToken(model).subscribe(
      (response) =>
        response == true
          ? (this.successMessage = true)
          : (this.successMessage = false),
      (error) => (this.errorMessage = error)
    );
  }
  ResetPasswordModel(): resetPasswordRequest {
    var model = new resetPasswordRequest();
    model.token = this.token;
    model.password = this.password.value;
    return model;
  }
}
