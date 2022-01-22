import { AuthService } from './../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CustomerCardDetailListModel } from './../../models/listModels/customerCardDetailListModel';
import { CustomerCardDetailService } from './../../services/customer-card-detail.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  customerId:number;
  cards:CustomerCardDetailListModel[]=[]

  constructor(private customerCardDetailService: CustomerCardDetailService,
            private toastrService:ToastrService,private authService:AuthService
    ) { }

  ngOnInit() {
   this.customerId=this.authService.getUserFromLocalStorage().id;
    this.findAllCustomerCardDetailsByCustomerId();
  }
  findAllCustomerCardDetailsByCustomerId (){
    this.customerCardDetailService.findAllByCustomerId(this.customerId).subscribe(response =>{
      if(response.success){     
        this.cards=response.data;
        this.toastrService.success(response.message,"Başarılı");
        
      }else{
        this.toastrService.warning(response.message,"Başarısız");
     
      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
    }
    )

  }
  deleteCard (id:number){
    this.customerCardDetailService.delete(id).subscribe(response =>{
      if(response.success){     
        this.findAllCustomerCardDetailsByCustomerId();
        this.toastrService.success(response.message,"Başarılı");
        
      }else{
        this.toastrService.warning(response.message,"Başarısız");
     
      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
    }
    )

  }
}
