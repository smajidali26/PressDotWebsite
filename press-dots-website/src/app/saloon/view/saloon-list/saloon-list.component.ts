import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaloonService } from '../../service/saloon.service';
import { ISaloonView } from '../../model/saloonView';

@Component({
  selector: 'app-saloon-list',
  templateUrl: './saloon-list.component.html',
  styleUrls: ['./saloon-list.component.css'],
})
export class SaloonListComponent implements OnInit {
  constructor(private router: Router, private _saloonService: SaloonService) {}

  pageTitle: string = 'Saloons';
  saloons: ISaloonView[];
  errorMessage: string = '';

  ngOnInit() {
    this.FillSaloons();
  }
  FillSaloons() {
    this._saloonService.getSaloons().subscribe({
      next: (data) => {
        this.saloons = data.data;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  createNewSaloon() {
    this.router.navigate(['saloon']);
  }
  DeleteSaloon(id) {
    this._saloonService.DeleteSaloon(id).subscribe(
      (response) => this.FillSaloons(),
      (error) => (this.errorMessage = error)
    );
  }
}
