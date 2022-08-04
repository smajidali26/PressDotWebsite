import { Component, OnInit } from '@angular/core';
import {
  FormGroup
} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ICountry } from 'src/app/registration/model/country';
import { LocationService } from 'src/app/shared/service/locationService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './add-country.component.html',
})
export class AddCountryComponent implements OnInit {      
  countryList: ICountry[]; 
  constructor(
    private fb: FormBuilder,   
    private locationService: LocationService,   
    private router : Router
  ) {}

  public errorMessage: string = '';
  addCountryForm: FormGroup;  
 
  get country() {
    return this.addCountryForm.get('country');
  }

  pageTitle: string = 'Add Country';
  ngOnInit() {
    this.addCountryForm = this.fb.group(
      {
        country:['', [Validators.required]]                   
      },      
    );
  }
  onSubmit() { 
    this.locationService.saveLocation(this.country.value,null).subscribe( 
    (response) => this.success(),
    (error) => (this.errorMessage = error))
  }
  success(){
    this.router.navigate(['/location']);
  }
}
