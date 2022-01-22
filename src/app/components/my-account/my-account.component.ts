import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  isIndividualCustomer:boolean=false;
  isCorporateCustomer:boolean=false;
  constructor(private authService: AuthService,) { }
  
  ngOnInit() {
this.isIndividualCustomer=this.authService.isIndividualCustomer();
this.isCorporateCustomer=this.authService.isCorporateCustomer();
  }

}
