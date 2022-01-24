import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ListResponseModel } from './../../../models/responseModels/listResponseModel';
import { PaymentListModel } from './../../../models/listModels/paymentListModel';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css'],
})
export class PaymentAddComponent implements OnInit {
  //variables
  loading = false;
  //constructor
  constructor(
    private paymentService: PaymentService,
    private toastrService: ToastrService
  ) {}
  //starter
  ngOnInit() {}
  paymentAddForm = new FormGroup({
    rentalId: new FormControl('', [Validators.required]),
    paymentTime: new FormControl('', [Validators.required]),
    totalPaymentAmount: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
  });
  //clear form
  clearPaymentAddForm() {
    this.paymentAddForm.patchValue({
      rentalId: '',
      paymentTime: '',
      totalPaymentAmount: '',
    });
  }
  //creates a new invoice
  add() {
    this.loading = true;
    let paymentModel = Object.assign({}, this.paymentAddForm.value);
    this.paymentService.add(paymentModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.loading = false;
          this.clearPaymentAddForm();
          this.paymentAddForm.markAsUntouched();
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.loading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.loading = false;
      }
    );
  }
}
