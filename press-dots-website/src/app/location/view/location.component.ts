import { Component, OnInit } from '@angular/core';
import {
  FormGroup
} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ICountry } from 'src/app/registration/model/country';
import { LocationService } from 'src/app/shared/service/locationService';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './location.component.html',
})

export class LocationComponent implements OnInit {
      
  countryList: ICountry[]; 
  constructor(
    private fb: FormBuilder,   
    private locationService: LocationService,   
    private router : Router
  ) {}

  public errorMessage: string = '';
  locationForm: FormGroup;  
 
  addCity() {
    this.router.navigate(['/addCity']);
  }

  addCountry() {
    this.router.navigate(['/addCountry']);
  }

  get country() {
    return this.locationForm.get('country');
  }
  get city() {
    return this.locationForm.get('city');
  }
  previous(){
    
    debugger;
    this.pageIndex = this.pageIndex -1;
    this.getCountries();
  }
  nextRecord(){
    debugger;
    this.pageIndex = this.pageIndex +1;
    this.getCountries();
  }
  next(item) {
    debugger;
    this.pageIndex = item;
    this.getCountries();
  }
  isActive(item) {
    if (item == this.pageIndex) {
      return true;
    } else {
      return false;
    }
  }
  getCountries(): void {
    this.locationService.getCountries().subscribe({
      next: (coutries) => {
        this.countryList = coutries;        
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  getAllCountries() : void{
    this.locationService.getAllCountries().subscribe({
      next: (coutries) => {
        this.countries = coutries;  
        this.countries.data = this.countries.data.filter(
          (item)=>
          item.parentLocationId == null
        );              
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  pageTitle: string = 'Locations';
  countries: IPagedDataView<any>;  
  pageSize: number;
  Index: any;  
  pageIndex: number;
  cityInformation: any = [];    
    hideme = [];
    public showCityInfo(index,id) {  
          this.locationService.getCities(id).subscribe((res:any)=>{  
            this.cityInformation[index] = res;  
          })  
          this.hideme[index] = !this.hideme[index];  
          this.Index = index;  
        }  
  getArrayFromNumber(length) {
    return new Array(length);
  }
  ngOnInit() {
    this.locationForm = this.fb.group(
      {
        country:['', [Validators.required]],
          
        city:['', [Validators.required]]          
      },      
    );
    this.getCountries();
    this.getAllCountries();
  }
  onSubmit() { 
    debugger;
    var parentLocationId = this.getParentId(this.country.value);
    this.locationService.saveLocation(this.city.value,parentLocationId).subscribe( 
    (response) => console.log(response),
    (error) => (this.errorMessage = error))
  }
  
  getParentId(locationName) : number{
  return this.countryList.find((x) => x.locationName == locationName).id;
  }

}
