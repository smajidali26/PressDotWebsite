import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LaboratoryService } from '../service/laboratory.service';
import { createLaboratoryRequest } from '../model/laboratory';

@Component({
  templateUrl: './laboratory.component.html',
})
export class LaboratoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private service : LaboratoryService      
  ) {}

  laboratoryForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  get labName() {
    return this.laboratoryForm.get('labName');
  }

  ngOnInit() {
    this.laboratoryForm = this.fb.group({
        labName: ['', [Validators.required]]     , 
    });
  }

  pageTitle: string = 'Create Laboratory';

  onSubmit() {
    this.submitted = true;

    let model = JSON.stringify(this.FillModel());
    this.service.create(model).subscribe(
      (response) => this.Success(response),
      (error) => (this.errorMessage = error)
    );
  }

  Success(respose) {
    console.log(respose);    
    this.router.navigate(['/laboratorylist']).then(() => {
      window.location.reload();
  })
}

  FillModel(): createLaboratoryRequest {
    var model = new createLaboratoryRequest();
    model.laboratoryName = this.labName.value;
    return model;
  }
}
