import { UpdateIndividualCustomerModel } from './../../../../models/updateModels/updateIndividualCustomerDomain';
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
  customerId=4;
  customer:IndividualCustomerListModel;
  
  constructor(private individualCustomerService: IndividualCustomerService,
              private toastrService: ToastrService,
    ) { }

  ngOnInit() {
    
  }
  customerUpdateForm = new FormGroup({
    nationalityNo: new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
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
      if(response.success){
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
  /*
  update(){
    let model:UpdateIndividualCustomerModel=Object.assign({},this.colorAddForm.value);
    this.individualCustomerService.update(this.customerId).subscribe(response =>{
      if(response.success){
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
*/

}
