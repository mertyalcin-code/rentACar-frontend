import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ListResponseModel } from './../../models/responseModels/listResponseModel';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { InvoiceListModel } from 'src/app/models/listModels/invoiceListModel';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  //variables
  invoices: InvoiceListModel[] = [];
  invoicesLoading: boolean = false;
  deleteLoading = false;
  searchTerm: string = '';
  //constructor
  constructor(
    private invoiceService: InvoiceService,
    private toastrService: ToastrService
  ) {}
  //starter
  ngOnInit(): void {
    this.findAll();
  }
  //finds all invoices
  findAll() {
    this.invoicesLoading = true;
    this.invoiceService.findAll().subscribe(
      (response: ListResponseModel<InvoiceListModel>) => {
        if (response.success) {
          this.invoicesLoading = false;
          this.invoices = response.data;
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.invoicesLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.invoicesLoading = false;
      }
    );
  }
  //deletes an invoice
  delete(id: number) {
    this.deleteLoading = true;
    this.invoiceService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.deleteLoading = false;
          this.findAll();
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.deleteLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.deleteLoading = false;
      }
    );
  }
}
