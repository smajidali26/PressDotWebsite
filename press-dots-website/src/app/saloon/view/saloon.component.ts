import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaloonService } from '../service/saloon.service';
import { ICountry } from '../model/country';
import { ICity } from '../model/city';
import { saloonCreateRequest } from '../model/saloon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saloon',
  templateUrl: './saloon.component.html',
  styleUrls: ['./saloon.component.css'],
})
export class SaloonComponent implements OnInit {
  countryList: ICountry[];
  cityList: ICity[];

  constructor(
    private fb: FormBuilder,
    private _saloonService: SaloonService,
    private router: Router
  ) {}

  public errorMessage: string = '';
  saloonForm: FormGroup;
  submitted = false;
  pageTitle: string = 'New Saloon';

  get saloonName() {
    return this.saloonForm.get('saloonName');
  }
  get email() {
    return this.saloonForm.get('email');
  }
  get phone() {
    return this.saloonForm.get('phone');
  }
  get address() {
    return this.saloonForm.get('address');
  }
  get country() {
    return this.saloonForm.get('country');
  }
  get city() {
    return this.saloonForm.get('city');
  }

  ngOnInit() {
    this.FillCountries();
    this.saloonForm = this.fb.group({
      saloonName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required]],
      address: ['',[Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.saloonForm.value);
    let model = JSON.stringify(this.FillSaloonModel());
    this._saloonService.createSaloon(model).subscribe(
      (response) => this.router.navigate(['saloonlist']),
      (error) => (this.errorMessage = error)
    );
  }
  FillSaloonModel(): saloonCreateRequest {
    var model = new saloonCreateRequest();
    model.saloonName = this.saloonName.value;
    model.email = this.email.value;
    model.phone = this.phone.value;
    model.address = this.address.value;
    model.countryId = this.country.value;
    model.cityId = this.city.value;
    model.saloonTypeId = 2; // 2 for normal saloon
    return model;
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
    this.saloonForm.reset();
  }
}
