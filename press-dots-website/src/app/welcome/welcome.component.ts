import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenManagerService } from '../shared/service/TokenManagerService';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private tokenManagerService: TokenManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var roleName = this.tokenManagerService.retrieveUserRoleName();
    if(roleName == 'Active Dentist' || roleName == 'Passive Dentist'){
      this.router.navigate(['dentistdashboard']).then(() => {
        window.location.reload();
      });
  }}
}
