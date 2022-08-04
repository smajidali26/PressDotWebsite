import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { SignInService } from '../service/signin.service';
import { Router } from '@angular/router';
import { signInModel } from '../model/signin';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _signInService: SignInService,
    private tokenManagerService: TokenManagerService,
    private router: Router
  ) {}
  signInModel: signInModel;
  signInForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  pageTitle: string = 'Customer Login';

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this._signInService.signIn(this.email.value, this.password.value).subscribe(
      (response) => this.SuccessSignIn(response),
      
      (error) => (this.errorMessage = error)
    );
  }
  SuccessSignIn(data: object) {
    if(data != null)
    {
      this.tokenManagerService.store(data);
      var roleName = this.tokenManagerService.retrieveUserRoleName();
      if(roleName == 'Active Dentist' || roleName == 'Passive Dentist'){
        this.router.navigate(['dentistdashboard']).then(() => {
          window.location.reload();
        });
      }
      else if(roleName == 'Laboratory'){
        this.router.navigate(['labdashboard']).then(() => {
          window.location.reload();
      });
    }   
      else{
      this.router.navigate(['welcome']).then(() => {
        window.location.reload();
      });
    }
    }
    else
      this.errorMessage = 'You have entered an invalid username or password';   
    }   
  
}
