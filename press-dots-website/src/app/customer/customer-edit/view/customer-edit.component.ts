import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRoles } from 'src/app/registration/model/role';
import { RegistrationService } from 'src/app/registration/service/registration.service';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { CustomerUpdateRequest } from '../../model/customer';
import { CustomerService } from '../../service/customer.service';

@Component({    
    templateUrl: './customer-edit.component.html',    
  })
export class CustomerEditComponent implements OnInit{
    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private customerService: CustomerService,
        private router: Router,
        private _registrationService: RegistrationService,
        private tokenManagerService: TokenManagerService,
    ){}
    errorMessage: string;
    customerEditForm: FormGroup;
    submitted = false;
    pageTitle= "Edit User";
    roleList: IRoles[];
    isDentistRole: boolean = false;

    get firstname() {
        return this.customerEditForm.get('firstname');
      }
      get lastname() {
        return this.customerEditForm.get('lastname');
      }
      get email() {
        return this.customerEditForm.get('email');
      }
      get mobileNumber() {
        return this.customerEditForm.get('mobileNumber');
      }
      get isActive() {
        return this.customerEditForm.get('isActive');
      }
      get roles(){
        return this.customerEditForm.get('roles');
      }

    ngOnInit(): void {
        this.FormInitialize();
        this.GetUserById();
        this.getRoles();
        this.CheckIsDentistRole();
      }
    FormInitialize() {
        this.customerEditForm = this.fb.group({
        firstname: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9 ]*$')]],
        lastname: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9 ]*$')]],
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: [''],
        isActive: [''],
        roles: this.isDentistRole ? ['', [Validators.required]] : [''],
          });
    }
    GetUserById() {
        this.customerService
      .getCustomerById(this.activatedRoute.snapshot.params.id)
      .subscribe(
        (response) => this.SuccessfullyGetCustomer(response) ,
        (error) => (this.errorMessage = error)
      );
    }
    SuccessfullyGetCustomer(response: any): void {
    this.firstname.setValue(response.firstname);
    this.lastname.setValue(response.lastname);
    this.mobileNumber.setValue(response.mobileNumber);
    this.email.setValue(response.email);
    this.isActive.setValue(response.isActive);
    if(response.userRoleId == 7)
      this.isDentistRole = true;
    }
    onSubmit() {
        this.submitted = true;
        this.errorMessage = '';
        let model = JSON.stringify(this.FillCustomoerModel());
        this.customerService.UpdateCustomer(model).subscribe(
           (response) => this.router.navigate(['customer']), 
           (error) => (this.errorMessage = error)
         );
      }
    FillCustomoerModel(): CustomerUpdateRequest {
        var model = new CustomerUpdateRequest();
        model.id = this.activatedRoute.snapshot.params.id;
        model.firstname = this.firstname.value;
        model.lastname = this.lastname.value;
        model.email = this.email.value;
        model.mobileNumber =  this.mobileNumber.value;
        model.isActive = this.isActive.value;
        if(this.isDentistRole)
        model.userRoleId = this.roles.value;
        return model;
    }
    getRoles(): void {
      this._registrationService.getRoles().subscribe({
        next: (roles) => {
          this.roleList = roles;
          this.roleList = this.roleList.filter(
            (item) =>
              item.userRoleName == 'Passive Dentist' ||
              item.userRoleName == 'Active Dentist'
          );
        },
        error: (err) => (this.errorMessage = err),
      });
    }
    CheckIsDentistRole(){
      var roleName = this.tokenManagerService.retrieveUserRoleName();
    if(roleName == 'Dentist'){
      this.isDentistRole = true;
    }
    }
}