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
  styleUrls: ['./invoice-individual-customer-detail.component.css']
})
export class InvoiceIndividualCustomerDetailComponent implements OnInit {
  id:number=0;
  invoice: InvoiceIndividualCustomerListModel;
  constructor(private InvoiceService: InvoiceService,
    private toastrService: ToastrService,
    private router:ActivatedRoute
    ) { }

  ngOnInit() {
    this.id = parseInt(this.router.snapshot.paramMap.get('id')); 
    this.findById();  
  }
  findById(){
    this.InvoiceService.findByRentalIdForIndividualCustomer(this.id).subscribe(
      (response: SingleResponseModel<InvoiceIndividualCustomerListModel>) => {
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
