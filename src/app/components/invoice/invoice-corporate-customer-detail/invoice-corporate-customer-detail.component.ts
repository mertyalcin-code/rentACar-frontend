import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from './../../../services/invoice.service';
import { InvoiceCorporateCustomerListModel } from './../../../models/listModels/invoiceCorporateCustomerListModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-corporate-customer-detail',
  templateUrl: './invoice-corporate-customer-detail.component.html',
  styleUrls: ['./invoice-corporate-customer-detail.component.css']
})
export class InvoiceCorporateCustomerDetailComponent implements OnInit {

  id:number=0;
  invoice: InvoiceCorporateCustomerListModel;
  constructor(private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private router:ActivatedRoute
    ) { }

  ngOnInit() {
    this.id = parseInt(this.router.snapshot.paramMap.get('id')); 
    this.findById();  
  }
  findById(){
    this.invoiceService.findByRentalIdForCorporateCustomer(this.id).subscribe(
      (response: SingleResponseModel<InvoiceCorporateCustomerListModel>) => {
        if (response.success) {   
          console.log(response.data)
          this.invoice=response.data;
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

}
