import { UpdatePaymentModel } from './../../../models/updateModels/updatePaymentModel';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { PaymentListModel } from './../../../models/listModels/paymentListModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.css']
})
export class PaymentUpdateComponent implements OnInit {
  loading:boolean = false;
  editPayment:PaymentListModel;
  constructor(private paymentService : PaymentService,
              private toastrService : ToastrService,
              private router : ActivatedRoute
    ) { }

  ngOnInit() {
    this.findById(parseInt(this.router.snapshot.paramMap.get('id'))) ;  
  }
  paymentUpdateForm = new FormGroup({
    rentalId: new FormControl("",[Validators.required]),
    paymentTime: new FormControl("",[Validators.required]),
    totalPaymentAmount: new FormControl("",[Validators.required,Validators.min(0)]),
  })
  clearPaymentUpdateForm() {
    this.paymentUpdateForm.patchValue({
      rentalId: '',   
      paymentTime: '',   
      totalPaymentAmount: '',   
    });
  }
  findById(id:number){
    this.paymentService.findById(id).subscribe(
      (response: SingleResponseModel<PaymentListModel>) => {
        if (response.success) {   
          this.editPayment=response.data;
          this.paymentUpdateForm.patchValue({
            rentalId:response.data.rentalId,   
            paymentTime:response.data.paymentTime,   
            totalPaymentAmount:response.data.totalPaymentAmount,   
          });
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");

      }
    )
  }
  
  update(){
    this.loading = true;
    let paymentModel:UpdatePaymentModel = Object.assign({},this.paymentUpdateForm.value);
    paymentModel.id=this.editPayment.id;
    this.paymentService.update(paymentModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.loading = false;
          this.clearPaymentUpdateForm();
          this.paymentUpdateForm.markAsUntouched();
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