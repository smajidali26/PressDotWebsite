import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { ICity } from '../../model/city';
import { ICountry } from '../../model/country';
import { SaloonService } from '../../service/saloon.service';

@Component({
  selector: 'app-search-saloon',
  templateUrl: './search-saloon.component.html',
  styleUrls: ['./search-saloon.component.css']
})
export class SearchSaloonComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private tokenManagerService: TokenManagerService,
    private router: Router,
    private _saloonService : SaloonService
  ) { }

  pageTitle: string = 'Search Saloon';
  searchSaloonForm: FormGroup;
  submitted = false;
  errorMessage: string = '';
  countryList: ICountry[];
  cityList: ICity[];
  saloons: any[];
  dateString: string;
  
  get country() {
    return this.searchSaloonForm.get('country');
  }
  get city() {
    return this.searchSaloonForm.get('city');
  }
  get datePicker(){
    return this.searchSaloonForm.get('datePicker');
  }

  ngOnInit() {
    this.InitializeForm();
    this.FillCountries();
  }

  InitializeForm(){
    this.searchSaloonForm = this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      datePicker: ['', [Validators.required]],
    });
  }

  FillCountries() {
    this._saloonService.getCountries().subscribe({
      next: (countries) => {
        this.countryList = countries;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  FillCities(countryId) {
    this._saloonService.getCities(countryId).subscribe({
      next: (cities) => {
        this.cityList = cities;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  changeCountry(e) {
    if (this.country.value !== '') this.FillCities(this.country.value);
  }
  onReset() {
    this.searchSaloonForm.reset();
  }
 
  onSubmit() {
    this.submitted = true;
    //console.log(this.datePicker.value);
    this.GetDatePickerValue(this.datePicker.value);
    this.FillSaloonsByCityId(this.city.value);
    
  } 
  FillSaloonsByCityId(value: any) {
    this._saloonService.getSaloonsByCityId(value).subscribe({
      
      next: (data) => {
        this.saloons = data;
        //console.log(this.saloons);
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  GetDatePickerValue(value: any) {
    if(value != null && value !=''){
    this.dateString = value.year + '-' + value.month + '-' + value.day;
    //console.log(str);
    }
  }
}
