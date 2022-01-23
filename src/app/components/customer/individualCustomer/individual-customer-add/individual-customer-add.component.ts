import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IndividualCustomerService } from './../../../../services/individual-customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-customer-add',
  templateUrl: './individual-customer-add.component.html',
  styleUrls: ['./individual-customer-add.component.css']
})
export class IndividualCustomerAddComponent implements OnInit {

 

  loading=false;
  constructor(
    private individualCustomerService:IndividualCustomerService,
    private toastrService:ToastrService,
    private AuthService : AuthService,
    private router : Router
    
    ) { }
  ngOnInit() {
    if(this.AuthService.isAuthenticated()){
      this.router.navigateByUrl('/#');
    }
  }
  addIndividualCustomerForm = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(150)]),
    password: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    firstName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
    lastName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
    birthDate: new FormControl("",[Validators.required,]),
    nationalityNo: new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern(/^[0-9]\d*$/)]),
  })
  ClearAddindividualCustomerForm() {
    this.addIndividualCustomerForm.patchValue({
      email: '',   
      password: '',  
      firstName: '',  
      lastName: '',  
      nationalityNo: '', 
      birthDate: '',
    });
  }
  add(){
    this.loading = true;
    let model = Object.assign({},this.addIndividualCustomerForm.value);
    this.individualCustomerService.add(model).subscribe(
      (response: ResponseModel) => {
        if (response.success) {              
          this.loading = false;
          this.router.navigateByUrl("/register-success");
          this.ClearAddindividualCustomerForm();
          this.addIndividualCustomerForm.markAsUntouched();
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