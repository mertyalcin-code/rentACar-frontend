import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { CorporateCustomerService } from './../../../../services/corporate-customer.service';
import { CorporateCustomerComponent } from './../corporate-customer.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IndividualCustomerService } from './../../../../services/individual-customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-corporate-customer-add',
  templateUrl: './corporate-customer-add.component.html',
  styleUrls: ['./corporate-customer-add.component.css']
})
export class CorporateCustomerAddComponent implements OnInit {


  loading=false;
  constructor(
    private corporateCustomerService:CorporateCustomerService,
    private toastrService:ToastrService,
    private AuthService : AuthService,
    private router : Router
    
    ) { }
  ngOnInit() {
    if(this.AuthService.isAuthenticated()){
      this.router.navigateByUrl('/#');
    }
  }
  addCorporateCustomerForm = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    companyName: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(255)]),
    taxNumber: new FormControl("",[Validators.required,,Validators.pattern(/^[0-9]\d*$/)]),
  })
  ClearAddCorporateCustomerForm() {
    this.addCorporateCustomerForm.patchValue({
      email: '',   
      password: '',  
      companyName: '',  
      taxNumber: '',  
    });
  }
  add(){
    this.loading = true;
    let model = Object.assign({},this.addCorporateCustomerForm.value);
    this.corporateCustomerService.add(model).subscribe(
      (response: ResponseModel) => {
        if (response.success) {              
          this.loading = false;
          this.router.navigateByUrl('/register-success'); //neden çalışmıyor
          this.ClearAddCorporateCustomerForm();
          this.addCorporateCustomerForm.markAsUntouched();
          this.toastrService.success(response.message,"Başarılı");    
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.loading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.loading = false;
      }
    )
   

  }
  
}