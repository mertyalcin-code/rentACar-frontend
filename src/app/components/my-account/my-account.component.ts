import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  //variables
  isIndividualCustomer: boolean = false;
  isCorporateCustomer: boolean = false;
  //constructor
  constructor(private authService: AuthService) {}
  //starter
  ngOnInit() {
    this.isIndividualCustomer = this.authService.isIndividualCustomer();
    this.isCorporateCustomer = this.authService.isCorporateCustomer();
  }
}
