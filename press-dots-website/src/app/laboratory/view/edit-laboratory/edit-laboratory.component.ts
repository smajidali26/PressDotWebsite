import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SaloonService } from 'src/app/saloon/service/saloon.service';
import { AddLaboratoryUser, laboratory, UpdateLaboratoryRequest } from '../../model/laboratory';
import { LaboratoryService } from '../../service/laboratory.service';

@Component({
  selector: 'app-edit-laboratory',
  templateUrl: './edit-laboratory.component.html',
  styleUrls: ['./edit-laboratory.component.css']
})
export class EditLaboratoryComponent implements OnInit {

  constructor( private fb: FormBuilder,
    private router: Router, 
    private activatedRouter: ActivatedRoute,
    private _saloonService: SaloonService,
    private service : LaboratoryService  ) { }

    laboratoryEditForm: FormGroup;
    submitted = false;
    errorMessage: string = '';

    pageTitle: string = 'Edit Laboratory';

    laboratoryUserAssociatedForm: FormGroup;
    laboratoryUserSubmitted = false;
    errorMessageLaboratoryUser: string = '';
    LaboratoryUserList: any[];
    associatedLaboratoryUsers: any[];
  
    get labName() {
      return this.laboratoryEditForm.get('labName');
    }
    get laboratoryUsers() {
      return this.laboratoryUserAssociatedForm.get('laboratoryUsers');
    }
  ngOnInit(): void {
  this.LaboratoryEditForm();  
  this.LaboratoryUserAssociateForm();

  this.GetLaboratoryId();
  this.FillLaboratoryUsers();
  this.GetLaboratoryUserByLaboratoryId();
  }
  LaboratoryEditForm(){
    this.laboratoryEditForm = this.fb.group({
      labName: ['', [Validators.required]]     , 
  });
  }
  LaboratoryUserAssociateForm(){
    this.laboratoryUserAssociatedForm = this.fb.group({
      laboratoryUsers: ['', [Validators.required]]     , 
  });
  }

  GetLaboratoryId() {
    this.service
      .getLaboratoryId(this.activatedRouter.snapshot.params.id)
      .subscribe(
        (response) => this.SuccessfullyGetLaboratory(response),
        (error) => (this.errorMessage = error)
      );
  }
  SuccessfullyGetLaboratory(response: laboratory) {
    this.labName.setValue(response.laboratoryName);
  }

  onSubmit() {
    this.submitted = true;

    let model = JSON.stringify(this.FillModel());
    this.service.updateLaboratory(model).subscribe(
      (response) => this.router.navigate(['laboratorylist']),
      (error) => (this.errorMessage = error)
    );
  }
 
FillModel(): UpdateLaboratoryRequest {
  var model = new UpdateLaboratoryRequest();
  model.id = this.activatedRouter.snapshot.params.id;
  model.laboratoryName = this.labName.value;
  return model;
}
onLaboratoryUserAssociatedSubmit(){
this.laboratoryUserSubmitted = true;

let model = JSON.stringify(this.FillAddLaboratoryUserModel());
    this.service.AddLaboratoryUserAssociate(model).subscribe(
      (response) => this.SuccessLaboratoryUserAssociated(),
      (error) => (this.errorMessageLaboratoryUser = error)
    );
}
SuccessLaboratoryUserAssociated(){
  this.GetLaboratoryUserByLaboratoryId();
  this.LaboratoryUserAssociateForm();
}
FillLaboratoryUsers(){
  var userRoleId: number;
  userRoleId = 5; // 5 roleid for lab user
  this._saloonService.getDentists(userRoleId).subscribe({
    next: (data) => {
      this.LaboratoryUserList = data;
    },
    error: (err) => (this.errorMessageLaboratoryUser = err),
  });
}
FillAddLaboratoryUserModel() : AddLaboratoryUser{
  var model = new AddLaboratoryUser();
  model.laboratoryId = this.activatedRouter.snapshot.params.id;
  model.userId = this.laboratoryUsers.value;
  model.isEmailReceiver =true;
  return model;
}
GetLaboratoryUserByLaboratoryId(){
  this.service
      .GetLaboratoryUsersByLaboratoryId(this.activatedRouter.snapshot.params.id)
      .subscribe({
        next: (data) => {
          this.associatedLaboratoryUsers = data;
        },
        error: (err) => (this.errorMessageLaboratoryUser = err),
      });
}
DeleteLabortoryAssociationUser(id){

this.service.DeleteLaboratoryUserAssociation(id).subscribe(
  (response) => this.SuccessLaboratoryUserAssociated(),
  (error) => (this.errorMessageLaboratoryUser = error)
);
}
}
