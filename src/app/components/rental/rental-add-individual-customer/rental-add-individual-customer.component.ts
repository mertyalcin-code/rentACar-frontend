import { AuthService } from '../../../services/auth.service';
import { RentalAddResponseModel } from '../../../models/responseModels/rentalAddResponseModel';
import { SingleResponseModel } from '../../../models/responseModels/singleResponseModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { CreateCustomerCardDetailModel } from '../../../models/createModels/createCustomerCardDetailModel';
import { CustomerCardDetailService } from '../../../services/customer-card-detail.service';
import { CarService } from '../../../services/car.service';
import { CarListModel } from '../../../models/listModels/carListModel';
import { TotalPriceRequestModel } from '../../../models/createModels/totalPriceRequestModel';
import { RentalListModel } from '../../../models/listModels/rentalListModel';
import { PaymentService } from '../../../services/payment.service';
import { CreateAdditionalServiceModel } from '../../../models/createModels/createAdditionalServiceModel';
import { AdditionalServiceListModel } from '../../../models/listModels/additionalServiceListModel';
import { AdditionalServiceService } from '../../../services/additionalService.service';
import { AdditionalServiceItemService } from '../../../services/additionalServiceItem.service';
import { AdditionalServiceItemListModel } from '../../../models/listModels/additionalServiceItemListModel';

import { CreateRentalModel } from '../../../models/createModels/createRentalModel';
import { HttpErrorResponse } from '@angular/common/http';
import { PromoCodeListModel } from '../../../models/listModels/promoCodeListModel';
import { IndividualCustomerListModel } from '../../../models/listModels/individualCustomerListModel';
import { PromoCodeService } from '../../../services/promo-code.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from '../../../services/rental.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePaymentModel } from 'src/app/models/createModels/createPaymentModel';

@Component({
  selector: 'app-rental-individual-customer-add',
  templateUrl: './rental-add-individual-customer.component.html',
  styleUrls: ['./rental-add-individual-customer.component.css']
})
export class RentalAddForIndividualCustomerComponent implements OnInit {
  customerId ;
  carId:number;
  car:CarListModel;
  addLoading=false;
  additionalServiceItems : AdditionalServiceItemListModel[] = [];
  additionalServiceItemBasket: CreateAdditionalServiceModel[] = [];
  activeRental:RentalListModel 
  returnDate:Date;
  totalPrice:number;
  isCardDetailSaved=false;
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
    private carService:CarService,
    private customerCardDetailService: CustomerCardDetailService,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.customerId=this.authService.getUserFromLocalStorage().id;
    this.carId = parseInt(this.router.snapshot.paramMap.get('carId'));   
    this.getAdditionalServiceItems();
    this.findCarById();
    this.authService.isCorporateCustomer() ? this.linkRouter.navigateByUrl('/rental/corporate-customer/add/'+this.carId): null
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
    cardNo: new FormControl("",[Validators.required,Validators.minLength(16),Validators.maxLength(16),Validators.pattern(/^[0-9]\d*$/)]),
    month: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(2),Validators.pattern(/^[0-9]\d*$/)]),
    year: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(2),Validators.pattern(/^[0-9]\d*$/)]),
    cvv: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern(/^[0-9]\d*$/)]),
   
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
      (response: SingleResponseModel<RentalAddResponseModel>) => {
        if (response.success) {          
          this.returnDate=this.rentalAddForm.get('returnDate').value;
          this.addLoading = false;
          let model:RentalAddResponseModel=response.data;
          this.findById(response.data.rentalId);
          this.carId=response.data.carId;
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
  findCarById(){
    this.carService.findById(this.carId).subscribe(response =>{
      if(response.success){
        this.car=response.data;
     //   this.toastrService.success(response.message,"Başarılı");
        
      }else{
        this.toastrService.warning(response.message,"Başarısız");

      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
    }
    )
  }
  
  addAdditionalServices(){
    if(this.additionalServiceItemBasket.length<1){
      this.status='payment'; 
      this.calculateTotalPrice();    
      return;
    }
    this.additionalServiceService.addAll(this.additionalServiceItemBasket).subscribe(response =>{
      if(response.success){
        this.status='payment'; 
        this.calculateTotalPrice();       
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
    this.additionalServiceItemBasket = this.additionalServiceItemBasket.filter(
      model => model.additionalServiceItemId!==id
    )
    this.toastrService.error("Çıkarıldı","Başarılı")
  }
  
  isBasketContainItem(id:number):boolean{
    if (this.additionalServiceItemBasket.filter(e => e.additionalServiceItemId === id).length > 0) {
     return true;
    }else return false;
  }

  addPayment(){    
    this.paymentLoading = true;
    let createPaymentModel:CreatePaymentModel = Object.assign({},this.paymentAddForm.value);
    createPaymentModel.rentalId=this.activeRental.id;    
    createPaymentModel.returnDate=this.returnDate;
    this.paymentService.add(createPaymentModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.paymentLoading = false;
          this.status='success';
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
    if(response.success){
      this.toastrService.success('Toplam Ücret:'+response,"Başarılı");
      this.totalPrice=response.data;
    }else{
      this.toastrService.warning(response.message,"Başarısız");
    }

  }, (errorResponse: HttpErrorResponse) => {       
    this.toastrService.error(errorResponse.message,"Başarısız");

  }
  )
 }
 addCustomerCardDetail(){    
  let createCustomerCardDetailModel:CreateCustomerCardDetailModel = Object.assign({},this.paymentAddForm.value);
  createCustomerCardDetailModel.customerId=this.customerId;   
  this.customerCardDetailService.add(createCustomerCardDetailModel).subscribe(
    (response: ResponseModel) => {
      if (response.success) {           
        this.isCardDetailSaved = true;
     
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

findById(id:number){    
  this.rentalService.findById(id).subscribe(
    (response: SingleResponseModel<RentalListModel>) => {
      if (response.success) {           
        this.activeRental = response.data;     
       // this.toastrService.success(response.message,"Başarılı");
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
