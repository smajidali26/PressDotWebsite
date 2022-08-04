import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  SelectControlValueAccessor,
} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../../shared/validator/password-validator';
import { RegistrationService } from '../service/registration.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IRoles } from '../model/role';
import { registrationModel } from '../model/registration';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { LocationService } from 'src/app/shared/service/locationService';
import { ICountry } from '../model/country';
import { SaloonService } from 'src/app/saloon/service/saloonService';
import { saloonCreateRequest } from '../../saloon/model/saloon';
import { SaloonEmployeeService } from 'src/app/employeeSaloon/employeeSaloon.service';
import { saloonEmployeeCreateRequest } from 'src/app/employeeSaloon/model/saloonEmployee';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  roleList: IRoles[];
  countryList: ICountry[];
  cityList: ICountry[];
  isAdmin: boolean = false;
  isLogin: boolean = false;
  isPassiveDentistSelected: boolean = false;
  userId: number;
  saloonId: number;
  pageTitle: string;
  buttonTitle: string;

  constructor(
    private fb: FormBuilder,
    private _registrationService: RegistrationService,
    private router: Router,
    private tokenManagerService: TokenManagerService,
    private locationService: LocationService,
    private saloonService: SaloonService,
    private saloonEmployeeService: SaloonEmployeeService
  ) {}

  public errorMessage: string = '';
  registrationForm: FormGroup;
  submitted = false;

  get firstname() {
    return this.registrationForm.get('firstname');
  }
  get lastname() {
    return this.registrationForm.get('lastname');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  // get confirmPassword() {
  //   return this.registrationForm.get('confirmPassword');
  // }
  get email() {
    return this.registrationForm.get('email');
  }
  get mobileNumber() {
    return this.registrationForm.get('mobileNumber');
  }
  get userRole() {
    return this.registrationForm.get('userRole');
  }
  get saloonName() {
    return this.registrationForm.get('saloonName');
  }
  get country() {
    return this.registrationForm.get('country');
  }
  get city() {
    return this.registrationForm.get('city');
  }

  getRoles(): void {
    this._registrationService.getRoles().subscribe({
      next: (roles) => {
        this.roleList = roles;
        this.roleList = this.roleList.filter(
          (item) =>
            //item.userRoleName !== 'Customer' &&
            item.userRoleName !== 'Administrator' &&
            item.userRoleName !== 'Active Dentist' &&
            item.userRoleName !== 'Passive Dentist'
        );
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  getCountries(): void {
    this.locationService.getCountries().subscribe({
      next: (coutries) => {
        this.countryList = coutries;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  getCities(countryId): void {
    this.locationService.getCities(countryId).subscribe({
      next: (cities) => {
        this.cityList = cities;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit() {
    if (this.tokenManagerService.isAdmin()) {
      this.isAdmin = true;

      if (this.tokenManagerService.retrieveUserName() != 'empty')
      this.isLogin = this.tokenManagerService.isLogin;
      
      this.getCountries();
      this.pageTitle = 'New User';
      this.buttonTitle = 'Save';
    } else {
      this.pageTitle = 'Registration';
      this.buttonTitle = 'Register';
    }
    this.getRoles();
    this.registrationForm = this.fb.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
        lastname: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: [''],
        password: ['', [Validators.minLength(5)]],
        // confirmPassword: ['', [Validators.required]],
        userRole: this.isAdmin ? ['', [Validators.required]] : [''],
        saloonName: this.isPassiveDentistSelected
          ? ['', [Validators.required]]
          : [''],
        country: this.isPassiveDentistSelected
          ? ['', [Validators.required]]
          : [''],
        city: this.isPassiveDentistSelected
          ? ['', [Validators.required]]
          : [''],
      },
      { validator: PasswordValidator }
    );
  }
  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    console.log(this.registrationForm.value);
    let model = JSON.stringify(this.FillRegistrationModel());

    this._registrationService.register(model).subscribe(
      (response) => this.SuccessRegistration(response),
      (error) => (this.errorMessage = error)
    );
  }
  FillRegistrationModel(): registrationModel {
    var model = new registrationModel();
    model.firstname = this.firstname.value;
    model.lastname = this.lastname.value;
    model.email = this.email.value;
    model.mobileNumber = this.mobileNumber.value;
    model.password = this.password.value;
    model.userRoleId = this.getRoleId(this.userRole.value);
    model.selfRegistration = this.isLogin ? false : true; 

    return model;
  }

  getRoleId(value): number {
    //if (this.isAdmin) {
      return this.roleList.find((x) => x.userRoleName == value).id;
    //} else {
    //  return 2;
    //}
  }
  getCountryId(value): number {
    return this.countryList.find((x) => x.locationName == value).id;
  }
  getCityId(value): number {
    return this.cityList.find((x) => x.locationName == value).id;
  }

  FillSaloonModel(): saloonCreateRequest {
    var model = new saloonCreateRequest();
    model.saloonName = this.saloonName.value;
    model.countryId = this.getCountryId(this.country.value);
    model.cityId = this.getCityId(this.city.value);
    model.saloonTypeId = 1;
    return model;
  }

  FillSaloonEmployeeModel(): saloonEmployeeCreateRequest {
    var model = new saloonEmployeeCreateRequest();
    model.employeeId = this.userId;
    model.saloonId = this.saloonId;
    return model;
  }

  onRoleSelected(selectedValue) {
    if (selectedValue == 'Passive Dentist') {
      console.log(selectedValue);
      this.isPassiveDentistSelected = true;
    } else {
      this.isPassiveDentistSelected = false;
    }
  }

  onCountrySelected(selectedValue) {
    var id = this.countryList.find((x) => x.locationName == selectedValue).id;
    this.getCities(id);
  }
  onReset() {
    this.submitted = false;
    this.errorMessage = '';
    this.registrationForm.reset();
  }
  SuccessRegistration(response) {
    if (this.isAdmin) {
      if (this.isPassiveDentistSelected) {
        this.userId = response.id;
        this.addSaloon();
      }
      this.router.navigate(['customer']);
    } else this.router.navigate(['confirmEmail']);
  }
  SaloonAdded(response) {
    this.saloonId = response.id;

    console.log(this.userId, this.saloonId);
    let model = JSON.stringify(this.FillSaloonEmployeeModel());

    this.saloonEmployeeService.createSaloonEmployee(model).subscribe(
      (response) => this.SaloonEmployeeAdded(response),
      (error) => (this.errorMessage = error)
    );
  }

  SaloonEmployeeAdded(response): void {
    console.log(response);
    this.router.navigate(['customer']);
  }
  addSaloon(): void {
    if (this.isPassiveDentistSelected) {
      let model = JSON.stringify(this.FillSaloonModel());

      this.saloonService.createSaloon(model).subscribe(
        (response) => this.SaloonAdded(response),
        (error) => (this.errorMessage = error)
      );
    }
  }
}
