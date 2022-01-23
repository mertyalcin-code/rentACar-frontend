import { UpdateIndividualCustomerModel } from './../../../../models/updateModels/updateIndividualCustomerModel';
import { AuthService } from './../../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IndividualCustomerService } from './../../../../services/individual-customer.service';
import { Component, OnInit } from '@angular/core';
import { IndividualCustomerListModel } from 'src/app/models/listModels/individualCustomerListModel';

@Component({
  selector: 'app-individual-customer-update',
  templateUrl: './individual-customer-update.component.html',
  styleUrls: ['./individual-customer-update.component.css']
})
export class IndividualCustomerUpdateComponent implements OnInit {
  customerId:number;
  customer:IndividualCustomerListModel;
  loading=false;
  constructor(private individualCustomerService: IndividualCustomerService,
              private toastrService: ToastrService,private authService: AuthService
    ) { }

  ngOnInit() {
    this.customerId=this.authService.getUserFromLocalStorage().id;
    this.findById();
  }
  customerUpdateForm = new FormGroup({
    nationalityNo: new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11),,Validators.pattern(/^[0-9]\d*$/)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    firstName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
    lastName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
    birthDate: new FormControl("",[Validators.required]),
  })
  clearCustomerUpdateForm() {
    this.customerUpdateForm.patchValue({
      nationalityNo: '',   
      email: '',   
      firstName: '',   
      lastName: '',   
      birthDate: '',   
    });
  }
  findById (){
    this.individualCustomerService.findById(this.customerId).subscribe(response =>{
      console.log(response)
      if(response.success){
  
          this.customerUpdateForm.patchValue({
            nationalityNo: response.data.nationalityNo,   
            email: response.data.email,   
            firstName: response.data.firstName,   
            lastName: response.data.lastName,   
            birthDate: response.data.birthDate,   
          });
      
        this.customer=response.data;
        this.toastrService.success(response.message,"Başarılı");
        
      }else{
        this.toastrService.warning(response.message,"Başarısız");
     
      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
    }
    )
  }
  
  update(){
    let model:UpdateIndividualCustomerModel=Object.assign({},this.customerUpdateForm.value);
    model.id=this.customerId;
    this.loading=true;
    this.individualCustomerService.update(model).subscribe(response =>{
      if(response.success){
        this.clearCustomerUpdateForm();
        this.loading=false;
        this.toastrService.success(response.message,"Başarılı");
        
      }else{
        this.loading=false;
        this.toastrService.warning(response.message,"Başarısız");
     
      }
    }, (errorResponse: HttpErrorResponse) => {
      this.loading=false;       
      this.toastrService.error(errorResponse.message,"Başarısız");
    }
    )
  }


}
