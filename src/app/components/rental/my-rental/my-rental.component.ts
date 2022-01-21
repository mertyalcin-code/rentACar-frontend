import { MyRentalListModel } from './../../../models/listModels/myRentalListModel';
import { HttpErrorResponse } from '@angular/common/http';
import { RentalListModel } from './../../../models/listModels/rentalListModel';
import { InvoiceService } from './../../../services/invoice.service';
import { PaymentService } from './../../../services/payment.service';
import { CarService } from './../../../services/car.service';
import { RentalService } from './../../../services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-rental',
  templateUrl: './my-rental.component.html',
  styleUrls: ['./my-rental.component.css']
})
export class MyRentalComponent implements OnInit {
  customerId=4;
  rentals:MyRentalListModel[]=[];

  constructor(private toastrService: ToastrService,
            private rentalService: RentalService,
            private carService : CarService,
            private paymentService: PaymentService,
            private invoiceService: InvoiceService,


    
    ) { }

  ngOnInit() {
    this.findRentalsByCustomerId();

  }
  findRentalsByCustomerId (){
    this.rentalService.findAllByCustomerId(this.customerId).subscribe(response =>{
      if(response.success){
        console.log(response);
        this.rentals=response.data;
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
