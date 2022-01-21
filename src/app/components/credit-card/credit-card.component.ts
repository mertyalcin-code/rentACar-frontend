import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
