import { AuthService } from './../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from './../../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceIndividualCustomerListModel } from 'src/app/models/listModels/invoiceIndividualCustomerListModel';

@Component({
  selector: 'app-invoice-individual-customer-detail',
  templateUrl: './invoice-individual-customer-detail.component.html',
  styleUrls: ['./invoice-individual-customer-detail.component.css'],
})
export class InvoiceIndividualCustomerDetailComponent implements OnInit {
  //variables
  id: number = 0;
  invoice: InvoiceIndividualCustomerListModel;
  //constructor
  constructor(
    private InvoiceService: InvoiceService,
    private toastrService: ToastrService,
    private router: ActivatedRoute,
    authService: AuthService
  ) {}
  //starter
  ngOnInit() {
    this.id = parseInt(this.router.snapshot.paramMap.get('id'));
    this.findById();
  }
  //finds invıice by rental id
  findById() {
    this.InvoiceService.findByRentalIdForIndividualCustomer(this.id).subscribe(
      (response: SingleResponseModel<InvoiceIndividualCustomerListModel>) => {
        if (response.success) {
          this.invoice = response.data;
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }
}
