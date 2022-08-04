import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaloonService } from '../../saloon/service/saloon.service';
import { ICountry } from '../../saloon/model/country';
import { ICity } from '../../saloon/model/city';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
@Component({
  templateUrl: './create-appointment.component.html',
})
export class CreateAppointmentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private tokenManagerService: TokenManagerService,
    private router: Router,
    private _saloonService : SaloonService
  ) {}
  createAppointmentForm: FormGroup;
  submitted = false;
  errorMessage: string = '';
  countryList: ICountry[];
  cityList: ICity[];

  get country() {
    return this.createAppointmentForm.get('country');
  }
  get city() {
    return this.createAppointmentForm.get('city');
  }

  ngOnInit() {
    this.createAppointmentForm = this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
    this.FillCountries();
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
  onCancel() {
    this.createAppointmentForm.reset();
  }

  pageTitle: string = 'Create Appointment';

  onSubmit() {
    
  }
 
}
