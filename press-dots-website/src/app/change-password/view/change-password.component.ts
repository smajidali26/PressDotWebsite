import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { changePasswordRequest } from '../model/changepassword';
import { ChangePasswordService } from '../service/changepassword.service';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';

@Component({
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,

    private router: Router,
    private service: ChangePasswordService,
    private tokenService: TokenManagerService
  ) {}

  changePasswordForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
  }

  pageTitle: string = 'Change password';

  onSubmit() {
    this.submitted = true;

    let model = JSON.stringify(this.FillModel());
    this.service.changePassword(model).subscribe(
      (response) => this.Success(response),
      (error) => (this.errorMessage = error)
    );
  }

  Success(respose) {
    console.log(respose);
    this.tokenService.remove();
    this.tokenService.isLogin = false;
    this.router.navigate(['/signin']).then(() => {
      window.location.reload();
  })
}

  FillModel(): changePasswordRequest {
    var model = new changePasswordRequest();
    model.oldPassword = this.oldPassword.value;
    model.password = this.newPassword.value;
    model.userId = this.tokenService.retrieveUserId();
    return model;
  }
}
