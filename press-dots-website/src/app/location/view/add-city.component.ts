import { Component, OnInit } from '@angular/core';
import {
  FormGroup
} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ICountry } from 'src/app/registration/model/country';
import { LocationService } from 'src/app/shared/service/locationService';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add-city.component.html',
})
export class AddCityComponent implements OnInit {      
  countryList: ICountry[]; 
  constructor(
    private fb: FormBuilder,   
    private locationService: LocationService,   
    private router : Router
  ) {}

  public errorMessage: string = '';
  addCityForm: FormGroup;  
 
  get country() {
    return this.addCityForm.get('country');
  }
  get city() {
    return this.addCityForm.get('city');
  }
  getCountries(): void {
    this.locationService.getCountries().subscribe({
      next: (coutries) => {
        this.countryList = coutries;        
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  pageTitle: string = 'Add City';
  ngOnInit() {
    this.addCityForm = this.fb.group(
      {
        country:['', [Validators.required]],
          
        city:['', [Validators.required]]          
      },      
    );
    this.getCountries();    
  }
  onSubmit() { 
    debugger;
    var parentLocationId = this.getParentId(this.country.value);
    this.locationService.saveLocation(this.city.value,parentLocationId).subscribe( 
    (response) => this.success(),
    (error) => (this.errorMessage = error))
  }
  getParentId(locationName) : number{
  return this.countryList.find((x) => x.locationName == locationName).id;
  }

  success(){
    this.router.navigate(['/location']);
  }

}
