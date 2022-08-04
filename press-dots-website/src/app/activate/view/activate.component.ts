import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivateService } from '../service/activate.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
})
export class ActivateComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _activeService: ActivateService
  ) {}

  token: string = '';
  errorMessage: string = '';
  successMessage: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
    this._activeService.activate(this.token).subscribe(
      (response) =>
        response == true
          ? (this.successMessage = true)
          : (this.successMessage = false),
      (error) => (this.errorMessage = error)
    );
  }
}
