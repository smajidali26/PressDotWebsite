import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { TokenManagerService } from './shared/service/TokenManagerService';

@Component({
  selector: 'pd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pageTitle = 'PressDots Website';
  isLogin: boolean = false;
  isAdmin: boolean;
  userName: string = null;
  isDentist : boolean = false;
  isCustomer : boolean = false;
  isSaloonAdmin : boolean = false;

  constructor(
    private _router: Router,
    private _location: Location,
    private tokenManagerService: TokenManagerService
  ) {}
  ngOnInit(): void {
    //this.isLogin = this.tokenManagerService.isLogin;
    this.userName =
      this.tokenManagerService.retrieveUserName() == 'empty'
        ? null
        : this.tokenManagerService.retrieveUserName();
    this.CheckUserAndRole();
  }
  onLogout() {
    localStorage.removeItem('currentUser');
    this.tokenManagerService.isLogin = false;
    this.userName = null;
    this.isLogin = this.tokenManagerService.isLogin;
    this.isCustomer = false;
    this._router.navigate(['signin']);
  }
  CheckUserAndRole() {
    if (this.tokenManagerService.isAdmin())
      this.isAdmin = this.tokenManagerService.isAdmin();

    var chek = this.tokenManagerService.retrieveUserName();
    if (this.tokenManagerService.retrieveUserName() != 'empty')
      this.isLogin = this.tokenManagerService.isLogin;
    if(this.tokenManagerService.retrieveUserRoleName() == 'Active Dentist' || this.tokenManagerService.retrieveUserRoleName() == 'Passive Dentist' )
    this.isDentist = true;

    if(this.tokenManagerService.retrieveUserRoleName() == 'Customer')
    this.isCustomer = true;
    if(this.tokenManagerService.retrieveUserRoleName() == 'Saloon Administrator')
    this.isSaloonAdmin = true;
  }
}
