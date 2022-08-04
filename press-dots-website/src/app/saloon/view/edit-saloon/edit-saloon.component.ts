import { Component, OnInit } from '@angular/core';
import { ICity } from '../../model/city';
import { ICountry } from '../../model/country';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaloonService } from '../../service/saloon.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  associateDentistWithSaloonRequest,
  associateLaboratoryWithSaloonRequest,
  IAssociatedLaboratriesWithSaloon,
  saloon,
  saloonUpdateRequest,
} from '../../model/saloon';
import { saloonEmployeeCreateRequest } from 'src/app/employeeSaloon/model/saloonEmployee';
import { SaloonEmployeeService } from 'src/app/employeeSaloon/employeeSaloon.service';

@Component({
  selector: 'app-edit-saloon',
  templateUrl: './edit-saloon.component.html',
  styleUrls: ['./edit-saloon.component.css'],
})
export class EditSaloonComponent implements OnInit {
  countryList: ICountry[];
  cityList: ICity[];
  dayList: any[];
  dentistList: any[];
  laboratoryList: any[];
  SaloonAdminList: any[];
  associatedLabortriesWithSaloon: IAssociatedLaboratriesWithSaloon[];
  associatedDentitsList: any[];
  associatedSaloonAdmins: any[];

  constructor(
    private fb: FormBuilder,
    private _saloonService: SaloonService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private saloonEmployeeService: SaloonEmployeeService
  ) {}

  public errorMessage: string = '';
  public errorMessageAssociatedDentist: string = '';
  public errorMessageLaboratory: string = '';
  errorMessageSaloonAdmin: string = '';
  saloonEditForm: FormGroup;
  dentistAssociatedForm: FormGroup;
  laboratoryAssociatedForm: FormGroup;
  SaloonAdminAssociatedForm: FormGroup;
  submitted = false;
  associatedDentistSubmitted = false;
  associatedLaboratorySubmitted = false;
  associatedSaloonAdminSubmitted = false;
  pageTitle: string = 'Edit Saloon';
  associatedDentists: string = 'Associated Dentists';
  associatedLaboratory: string = 'Associated Laboratory';
  associatedSaloonAdmin: string = 'Associated Saloon Administrator'

  get saloonName() {
    return this.saloonEditForm.get('saloonName');
  }
  get email() {
    return this.saloonEditForm.get('email');
  }
  get phone() {
    return this.saloonEditForm.get('phone');
  }
  get address() {
    return this.saloonEditForm.get('address');
  }
  get country() {
    return this.saloonEditForm.get('country');
  }
  get city() {
    return this.saloonEditForm.get('city');
  }
  get dentists() {
    return this.dentistAssociatedForm.get('dentists');
  }
  get day() {
    return this.dentistAssociatedForm.get('day');
  }
  get startHour() {
    return this.dentistAssociatedForm.get('startHour');
  }
  get startMins() {
    return this.dentistAssociatedForm.get('startMins');
  }
  get endHour() {
    return this.dentistAssociatedForm.get('endHour');
  }
  get endMins() {
    return this.dentistAssociatedForm.get('endMins');
  }
  get laboratories() {
    return this.laboratoryAssociatedForm.get('laboratories');
  }
  get isDefaultLaboratoryCheckBox() {
    return this.laboratoryAssociatedForm.get('isDefaultLaboratoryCheckBox');
  }
  get saloonadmins() {
    return this.SaloonAdminAssociatedForm.get('saloonadmins');
  }

  ngOnInit(): void {
    this.FormsInitialize();
    this.GetSaloonById();
  }
  FormsInitialize() {
    this.SaloonEditFormInitialize();
    this.AssociateDentistFormInitialize();
    this.AssociateLaboratoryFormInitialize();
    this.AssociateSaloonAdminFormInitialize();
  }
  SaloonEditFormInitialize() {
    this.saloonEditForm = this.fb.group({
      saloonName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }
  AssociateDentistFormInitialize() {
    this.dentistAssociatedForm = this.fb.group({
      dentists: ['', [Validators.required]],
      day: ['', [Validators.required]],
      startHour: ['', [Validators.required]],
      startMins: ['', [Validators.required]],
      endHour: ['', [Validators.required]],
      endMins: ['', [Validators.required]],
    });
  }
  AssociateLaboratoryFormInitialize() {
    this.laboratoryAssociatedForm = this.fb.group({
      isDefaultLaboratoryCheckBox: ['true'],
      laboratories: ['', [Validators.required]],
    });
  }
  AssociateSaloonAdminFormInitialize() {
    this.SaloonAdminAssociatedForm = this.fb.group({
      saloonadmins: ['', [Validators.required]],
    });
  }
  GetSaloonById() {
    this._saloonService
      .getSaloonById(this.activatedRouter.snapshot.params.id)
      .subscribe(
        (response) => this.SuccessfullyGetSaloon(response),
        (error) => (this.errorMessage = error)
      );
  }
  SuccessfullyGetSaloon(response: saloon) {
    this.saloonName.setValue(response.saloonName);
    this.email.setValue(response.email);
    this.phone.setValue(response.phone);
    this.address.setValue(response.address);
    this.country.setValue(response.countryId);
    this.city.setValue(response.cityId);
    this.FillCountries();
    this.FillCities(response.countryId);

    this.FillDentists();
    this.FillDays();
    this.FillLaboratories();
    this.FillSaloonAdmins();

    this.AssociatedDentistsWithSaloon();
    this.FillAssociatedLabortriesWithSaloon();
    this.AssociatedSaloonAdmins();
  }
  onSubmit() {
    this.submitted = true;
    let model = JSON.stringify(this.FillSaloonModel());
    this._saloonService.updateSaloon(model).subscribe(
      (response) => this.router.navigate(['saloonlist']),
      (error) => (this.errorMessage = error)
    );
  }
  onDentistAssociateSubmit() {
    this.associatedDentistSubmitted = true;
    this.errorMessageAssociatedDentist = '';

    if (this.ValidateTime()) {
      let model = JSON.stringify(this.FillAssociateDentistWithSaloon());
      this._saloonService.associateDentistWithSaloon(model).subscribe(
        (response) => this.SuccessAssociationDentistsWithSaloon(),
        (error) => (this.errorMessageAssociatedDentist = error)
      );
    } else {
      this.errorMessageAssociatedDentist =
        'start time should be less then end hour time';
    }
  }
  onLaboratoryAssociateSubmit() {
    this.associatedLaboratorySubmitted = true;
    this.errorMessageLaboratory = '';

    let model = JSON.stringify(this.FillAssociateLaboratoryWithSaloon());
    this._saloonService.associateLaboratoryWithSaloon(model).subscribe(
      (response) => this.SuccessAssociationLaboratoryWithSaloon(),
      (error) => (this.errorMessageLaboratory = error)
    );
  }
  onSaloonAdminAssociateSubmit() {
    this.associatedSaloonAdminSubmitted = true;
    this.errorMessageSaloonAdmin = '';

   let model = JSON.stringify(this.FillAssociateSaloonAdmin());

    this.saloonEmployeeService.createSaloonEmployee(model).subscribe(
      (response) => this.SuccessAssociatedSaloonAdmin(),
      (error) => (this.errorMessageSaloonAdmin = error)
    );
  }
  SuccessAssociationDentistsWithSaloon() {
    this.AssociatedDentistsWithSaloon();
    this.AssociateDentistFormInitialize();
  }
  SuccessAssociationLaboratoryWithSaloon() {
    this.FillAssociatedLabortriesWithSaloon();
    this.AssociateLaboratoryFormInitialize();
  }
  SuccessAssociatedSaloonAdmin(){
    this.AssociatedSaloonAdmins();
    this.AssociateSaloonAdminFormInitialize();
  }

  ValidateTime(): boolean {
    if (this.startHour.value > this.endHour.value) {
      return false;
    }
    if (
      this.startHour.value == this.endHour.value &&
      this.startMins.value > this.endMins.value
    ) {
      return false;
    }
    if (
      this.startHour.value == this.endHour.value &&
      this.startMins.value == this.endMins.value
    ) {
      return false;
    }
    return true;
  }
  FillAssociateDentistWithSaloon(): associateDentistWithSaloonRequest {
    var model = new associateDentistWithSaloonRequest();
    model.saloonId = this.activatedRouter.snapshot.params.id;
    model.employeeId = this.dentists.value;
    model.day = this.day.value;
    model.startTime = this.startHour.value + ':' + this.startMins.value;
    model.endTime = this.endHour.value + ':' + this.endMins.value;
    return model;
  }
  FillAssociateLaboratoryWithSaloon(): associateLaboratoryWithSaloonRequest {
    var model = new associateLaboratoryWithSaloonRequest();
    model.saloonId = this.activatedRouter.snapshot.params.id;
    model.laboratoryId = this.laboratories.value;
    model.isDefault = this.isDefaultLaboratoryCheckBox.value;
    return model;
  }
  FillAssociateSaloonAdmin():  saloonEmployeeCreateRequest {
    var model = new saloonEmployeeCreateRequest();
    model.employeeId = this.saloonadmins.value;
    model.saloonId = this.activatedRouter.snapshot.params.id;
    return model;
  }
  FillSaloonModel(): saloonUpdateRequest {
    var model = new saloonUpdateRequest();
    model.id = this.activatedRouter.snapshot.params.id;
    model.saloonName = this.saloonName.value;
    model.email = this.email.value;
    model.phone = this.phone.value;
    model.address = this.address.value;
    model.countryId = this.country.value;
    model.cityId = this.city.value;
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
  FillDays() {
    this._saloonService.getDays().subscribe({
      next: (days) => {
        this.dayList = days;
      },
      error: (err) => (this.errorMessageAssociatedDentist = err),
    });
  }
  FillDentists() {
    var userRoleId: number;
    userRoleId = 3; // 3 roleid for active dentist
    this._saloonService.getDentists(userRoleId).subscribe({
      next: (data) => {
        this.dentistList = data;
      },
      error: (err) => (this.errorMessageAssociatedDentist = err),
    });
  }
  FillLaboratories() {
    this._saloonService.getLaboratories().subscribe({
      next: (data) => {
        this.laboratoryList = data;
      },
      error: (err) => (this.errorMessageAssociatedDentist = err),
    });
  }
  FillSaloonAdmins(){
    var userRoleId: number;
    userRoleId = 6; // 6 roleid for saloon admin
    this._saloonService.getDentists(userRoleId).subscribe({
      next: (data) => {
        this.SaloonAdminList = data;
      },
      error: (err) => (this.errorMessageSaloonAdmin = err),
    });
  }
  FillAssociatedLabortriesWithSaloon() {
    this._saloonService
      .getAssociatedLabortoryBySaloonId(this.activatedRouter.snapshot.params.id)
      .subscribe({
        next: (data) => {
          this.associatedLabortriesWithSaloon = data;
        },
        error: (err) => (this.errorMessageLaboratory = err),
      });
  }
  AssociatedDentistsWithSaloon() {
    this._saloonService
      .getAssociatedDentistsBySaloonId(this.activatedRouter.snapshot.params.id)
      .subscribe({
        next: (data) => {
          this.associatedDentitsList = data;
        },
        error: (err) => (this.errorMessageAssociatedDentist = err),
      });
  }
  AssociatedSaloonAdmins(){
    this._saloonService.GetSaloonAdministratorsBySaloonId(this.activatedRouter.snapshot.params.id)
    .subscribe({
      next: (data) => {
        this.associatedSaloonAdmins = data;
      },
      error: (err) => (this.errorMessageSaloonAdmin = err),
    });
  }

  changeCountry(e) {
    if (this.country.value !== '') this.FillCities(this.country.value);
  }
  onCancel() {
    this.saloonEditForm.reset();
  }
  DeleteLabortoryAssociationWithSaloon(id) {
    if(confirm("Are you sure you want to delete lab?"))
    {
      this._saloonService.DeleteAssociatedLaboratoryWithSaloon(id).subscribe(
        (response) => this.FillAssociatedLabortriesWithSaloon(),
        (error) => (this.errorMessageLaboratory = error)
      );
    }
  }
  DeleteDentistAssociatedWithSaloon(id) {
    if(confirm("Are you sure you want to remove doctor association?"))
    {
      this._saloonService.DeleteAssociatedDentistWithSaloon(id).subscribe(
        (response) => this.AssociatedDentistsWithSaloon(),
        (error) => (this.errorMessageAssociatedDentist = error)
      );
    }
  }
  DeleteAssociationSaloonAdmin(id){
    if(confirm("Are you sure you want to remove administrator association?"))
    {
      this._saloonService.DeleteSaloonEmployee(id).subscribe(
        (response) => this.AssociatedSaloonAdmins(),
        (error) => (this.errorMessageSaloonAdmin = error)
      );
    }
  }
}
