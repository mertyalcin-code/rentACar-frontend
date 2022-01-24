import { UpdateCorporateCustomerModel } from './../../../../models/updateModels/updateCorporateCustomerModel';
import { SingleResponseModel } from './../../../../models/responseModels/singleResponseModel';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../../services/auth.service';
import { CorporateCustomerService } from './../../../../services/corporate-customer.service';
import { CorporateCustomerListModel } from './../../../../models/listModels/corporateCustomerListModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-corporate-customer-update',
  templateUrl: './corporate-customer-update.component.html',
  styleUrls: ['./corporate-customer-update.component.css']
})
export class CorporateCustomerUpdateComponent implements OnInit {
  //variables
  customerId:number;
  customer:CorporateCustomerListModel;
  loading=false;
  //constructor
  constructor(private corporateCustomerService: CorporateCustomerService,
              private toastrService: ToastrService,private authService: AuthService
    ) { }
  //starter
  ngOnInit() {
    this.customerId=this.authService.getUserFromLocalStorage().id;
    this.findById();
  }
  //update form
  customerUpdateForm = new FormGroup({
    taxNumber: new FormControl("",[Validators.required,,Validators.pattern(/^[0-9]\d*$/)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    companyName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),

  })
  //clear update form
  clearCustomerUpdateForm() {
    this.customerUpdateForm.patchValue({
      taxNumber: '',   
      email: '',   
      companyName: '',   
    
    });
  }
  //finds customer by id and patches the value
  findById (){
    this.corporateCustomerService.findById(this.customerId).subscribe(
      (response:SingleResponseModel<CorporateCustomerListModel>) =>{
      if(response.success){  
          this.customerUpdateForm.patchValue({
            taxNumber: response.data.taxNumber,   
            email: response.data.email,   
            companyName: response.data.companyName,   
    
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
  //sends a update request
  update(){
    let model:UpdateCorporateCustomerModel=Object.assign({},this.customerUpdateForm.value);
    model.id=this.customerId;
    this.loading=true;
    this.corporateCustomerService.update(model).subscribe(response =>{
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
