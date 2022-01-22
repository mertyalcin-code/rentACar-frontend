import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentListModel } from './../../models/listModels/paymentListModel';
import { ListResponseModel } from './../../models/responseModels/listResponseModel';
import { ColorListModel } from 'src/app/models/listModels/colorListModel';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from './../../services/payment.service';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService:PaymentService,
    private toastrService: ToastrService

    
    ) { }
  payments:PaymentListModel[]=[];
  paymentsLoading:boolean = false;
  deleteLoading=false;
  searchTerm:string='';
  ngOnInit(): void {
    this.findAll();
  }
  findAll(){
    this.paymentsLoading = true;   
    this.paymentService.findAll().subscribe(
      (response: ListResponseModel<PaymentListModel>) => {
        if (response.success) {           
          this.paymentsLoading = false;
          this.payments=response.data;
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.paymentsLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.paymentsLoading = false;
      }
    )
  }
  delete(id:number){
    this.deleteLoading = true;   
    this.paymentService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.deleteLoading = false;
          this.findAll();
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.deleteLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.deleteLoading = false;
      }
    )
  }

}
