import { TotalPriceRequestModel } from './../../../models/createModels/totalPriceRequestModel';
import { RentalListModel } from './../../../models/listModels/rentalListModel';
import { PaymentService } from './../../../services/payment.service';
import { CreateAdditionalServiceModel } from './../../../models/createModels/createAdditionalServiceModel';
import { AdditionalServiceListModel } from './../../../models/listModels/additionalServiceListModel';
import { AdditionalServiceService } from './../../../services/additionalService.service';
import { AdditionalServiceItemService } from './../../../services/additionalServiceItem.service';
import { AdditionalServiceItemListModel } from './../../../models/listModels/additionalServiceItemListModel';
import { ResponseModel } from './../../../models/responseModels/responseModel';
import { CreateRentalModel } from './../../../models/createModels/createRentalModel';
import { HttpErrorResponse } from '@angular/common/http';
import { PromoCodeListModel } from './../../../models/listModels/promoCodeListModel';
import { IndividualCustomerListModel } from './../../../models/listModels/individualCustomerListModel';
import { PromoCodeService } from './../../../services/promo-code.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from './../../../services/rental.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePaymentModel } from 'src/app/models/createModels/createPaymentModel';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  customerId =4;
  carId:number;
  addLoading=false;
  additionalServiceItems : AdditionalServiceItemListModel[] = [];
  additionalServiceItemBasket: CreateAdditionalServiceModel[] = [];
  activeRental:RentalListModel 
  totalPrice:number;
  paymentLoading=false;
  status:string='rental';
  promoCode: PromoCodeListModel;
  constructor(
    private rentalService:RentalService,
    private toastrService :ToastrService,
    private promoCodeService:PromoCodeService,
    private router: ActivatedRoute,
    private additionalServiceItemService: AdditionalServiceItemService,
    private additionalServiceService: AdditionalServiceService,
    private paymentService: PaymentService,
    private linkRouter:Router,
    ) { }

  ngOnInit() {
    this.carId = parseInt(this.router.snapshot.paramMap.get('carId'));   
    this.getAdditionalServiceItems();
  }
  rentalAddForm = new FormGroup({
    rentDate: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
    returnDate: new FormControl("",[Validators.required,]),
  })
  promoCodeForm = new FormGroup({
    code: new FormControl("",[Validators.maxLength(30)])
  })
  clearRentalAddForm() {
    this.rentalAddForm.patchValue({
      rentDate: '',
      returnDate:'',
    });
  }

  paymentAddForm = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(250)]),
    cardNo: new FormControl("",[Validators.required,Validators.minLength(16),Validators.maxLength(16)]),
    month: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(2)]),
    year: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(2)]),
   
  })
  additionalServiceAddForm = new FormGroup({
    additionalServiceitem: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
  })
  findPromoCodeByCode (code:string){
    this.promoCodeService.findByCode(code).subscribe(response =>{
      if(response.success){
        console.log(response.data)
        this.promoCode=response.data;
        this.toastrService.success(response.message,"Başarılı");
        
      }else{
        this.toastrService.warning(response.message,"Başarısız");
     
      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
 
    }
    )

  }
  
  addRental(){
    this.addLoading = true;
    let createRentalModel:CreateRentalModel = Object.assign({},this.rentalAddForm.value);
    createRentalModel.customerId=this.customerId;
    createRentalModel.promoCodeId=this.promoCode.id;
 
    createRentalModel.carId=this.carId;
    this.rentalService.addForIndividualCustomer(createRentalModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.addLoading = false;
          this.findActiveRentalByCarId();
       //   this.clearRentalAddForm();
       //   this.rentalAddForm.markAsUntouched();
          this.status='service';
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.addLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.addLoading = false;
      }
    )
    this.addLoading = false;
  }
  getAdditionalServiceItems(){
    this.additionalServiceItemService.findAll().subscribe(response =>{
      if(response.success){
        this.additionalServiceItems=response.data;
     //   this.toastrService.success(response.message,"Başarılı");
        
      }else{
        this.toastrService.warning(response.message,"Başarısız");

      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
    }
    )
  }
  findActiveRentalByCarId(){
    this.rentalService.findActiveRentalByCarId(this.carId).subscribe(response =>{
      if(response.success){
        this.activeRental=response.data;
        
        this.toastrService.success(response.message,"Başarılı");        
      }else{
        this.toastrService.warning(response.message,"Başarısız");

      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
    }
    )
  }
  addAdditionalServices(){
    this.additionalServiceService.addAll(this.additionalServiceItemBasket).subscribe(response =>{
      if(response.success){
        this.status='payment';        
       this.toastrService.success(response.message,"Başarılı");
        
      }else{
        this.toastrService.warning(response.message,"Başarısız");

      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
    }
    )
  }
  addAdditionalServiceItem(id:number){
 
    const model: CreateAdditionalServiceModel= {rentalId:this.activeRental.id,additionalServiceItemId:id}
    this.toastrService.success("Eklendi","Başarılı")
    this.additionalServiceItemBasket.push(model)
  }
  removeAdditionalServiceItem(id:number){

  }
  addPayment(){    
    this.paymentLoading = true;
    let createPaymentModel:CreatePaymentModel = Object.assign({},this.paymentAddForm.value);
    createPaymentModel.rentalId=this.customerId;    
    createPaymentModel.returnDate=this.rentalAddForm.get("returnDate").value; 
    this.paymentService.add(createPaymentModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.paymentLoading = false;
          this.linkRouter.navigateByUrl('/my-account');
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.paymentLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.paymentLoading = false;
      }
    )
    this.paymentLoading = false;
  }
 calculateTotalPrice(){
const model: TotalPriceRequestModel= {rentalId:this.activeRental.id,returnDate:this.rentalAddForm.get('returnDate').value}
  
  this.paymentService.calculateTotalPrice(model).subscribe(response =>{
    this.totalPrice=response;
  }, (errorResponse: HttpErrorResponse) => {       
    this.toastrService.error(errorResponse.message,"Başarısız");

  }
  )
 }
}
