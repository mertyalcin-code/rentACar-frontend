import { CreatePaymentModel } from 'src/app/models/createModels/createPaymentModel';
import { TotalPriceRequestModel } from './../../../models/createModels/totalPriceRequestModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { CreateCustomerCardDetailModel } from './../../../models/createModels/createCustomerCardDetailModel';
import { AuthService } from './../../../services/auth.service';
import { CustomerCardDetailService } from './../../../services/customer-card-detail.service';
import { CarService } from './../../../services/car.service';
import { PaymentService } from './../../../services/payment.service';
import { AdditionalServiceService } from './../../../services/additionalService.service';
import { AdditionalServiceItemService } from './../../../services/additionalServiceItem.service';
import { PromoCodeService } from './../../../services/promo-code.service';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from './../../../services/rental.service';
import { PromoCodeListModel } from './../../../models/listModels/promoCodeListModel';
import { RentalListModel } from './../../../models/listModels/rentalListModel';
import { CreateAdditionalServiceModel } from './../../../models/createModels/createAdditionalServiceModel';
import { CarListModel } from './../../../models/listModels/carListModel';
import { AdditionalServiceItemListModel } from './../../../models/listModels/additionalServiceItemListModel';
import {
  FormGroup,
  FormControl,
  Validators,
  NumberValueAccessor,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateRentalModel } from './../../../models/createModels/createRentalModel';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { RentalAddResponseModel } from './../../../models/responseModels/rentalAddResponseModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rental-add-corporate-customer',
  templateUrl: './rental-add-corporate-customer.component.html',
  styleUrls: ['./rental-add-corporate-customer.component.css'],
})
export class RentalAddCorporateCustomerComponent implements OnInit {
  //variables
  customerId;
  carId: number;
  car: CarListModel;
  addLoading = false;
  additionalServiceItems: AdditionalServiceItemListModel[] = [];
  additionalServiceItemBasket: CreateAdditionalServiceModel[] = [];
  activeRental: RentalListModel;
  returnDate: Date;
  totalPrice: number;
  isCardDetailSaved = false;
  paymentLoading = false;
  status: string = 'rental';
  promoCode: PromoCodeListModel;
  //constructor
  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private promoCodeService: PromoCodeService,
    private router: ActivatedRoute,
    private additionalServiceItemService: AdditionalServiceItemService,
    private additionalServiceService: AdditionalServiceService,
    private paymentService: PaymentService,
    private linkRouter: Router,
    private carService: CarService,
    private customerCardDetailService: CustomerCardDetailService,
    private authService: AuthService
  ) {}
  //starter
  ngOnInit() {
    this.customerId = this.authService.getUserFromLocalStorage().id;
    this.carId = parseInt(this.router.snapshot.paramMap.get('carId'));
    this.getAdditionalServiceItems();
    this.findCarById();
  }
  //create rental form
  rentalAddForm = new FormGroup({
    rentDate: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
    returnDate: new FormControl('', [Validators.required]),
  });
  //adds promotion codes
  promoCodeForm = new FormGroup({
    code: new FormControl('', [Validators.maxLength(30),Validators.required]),
  });
  //clears the rental form
  clearRentalAddForm() {
    this.rentalAddForm.patchValue({
      rentDate: '',
      returnDate: '',
    });
  }
  //payment create form
  paymentAddForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(250),
    ]),
    cardNo: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.pattern(/^[0-9]\d*$/),
    ]),
    month: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
      Validators.pattern(/^[0-9]\d*$/),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
      Validators.pattern(/^[0-9]\d*$/),
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern(/^[0-9]\d*$/),
    ]),
  });
  //additional service create form
  additionalServiceAddForm = new FormGroup({
    additionalServiceitem: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
  });
  //checks promo code is exists
  findPromoCodeByCode(code: string) {
    this.promoCodeService.findByCode(code).subscribe(
      (response) => {
        if (response.success) {
          this.promoCode = response.data;
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
  //creates rental request
  addRental() {
    this.addLoading = true;
    let createRentalModel: CreateRentalModel = Object.assign(
      {},
      this.rentalAddForm.value
    );
    createRentalModel.customerId = this.customerId;
    if (this.promoCode == null) {
      createRentalModel.promoCodeId = 7;
    } else {
      createRentalModel.promoCodeId = this.promoCode.id;
    }
    createRentalModel.carId = this.carId;
    this.rentalService.addForCorporateCustomer(createRentalModel).subscribe(
      (response: SingleResponseModel<RentalAddResponseModel>) => {
        if (response.success) {
          this.returnDate = this.rentalAddForm.get('returnDate').value;
          this.addLoading = false;
          let model: RentalAddResponseModel = response.data;
          this.findById(response.data.rentalId);
          this.carId = response.data.carId;
          //   this.clearRentalAddForm();
          //   this.rentalAddForm.markAsUntouched();
          this.status = 'service';
    //      this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.addLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.addLoading = false;
      }
    );
    this.addLoading = false;
  }
  //finds all items
  getAdditionalServiceItems() {
    this.additionalServiceItemService.findAll().subscribe(
      (response) => {
        if (response.success) {
          this.additionalServiceItems = response.data;
          //   this.toastrService.success(response.message,"Başarılı");
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }
  //finds car detail by id
  findCarById() {
    this.carService.findById(this.carId).subscribe(
      (response) => {
        if (response.success) {
          this.car = response.data;
          //   this.toastrService.success(response.message,"Başarılı");
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }
  //sends additional service reques
  addAdditionalServices() {
    if (this.additionalServiceItemBasket.length < 1) {
      this.status = 'payment';
      this.calculateTotalPrice();
      return;
    }
    this.additionalServiceService
      .addAll(this.additionalServiceItemBasket)
      .subscribe(
        (response) => {
          if (response.success) {
            this.status = 'payment';
            this.calculateTotalPrice();
     //       this.toastrService.success(response.message, 'Başarılı');
          } else {
            this.toastrService.warning(response.message, 'Başarısız');
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.toastrService.error(errorResponse.message, 'Başarısız');
        }
      );
  }
  //adds basket an item for additional service
  addAdditionalServiceItem(id: number) {
    const model: CreateAdditionalServiceModel = {
      rentalId: this.activeRental.id,
      additionalServiceItemId: id,
    };
    this.toastrService.success('Eklendi', 'Başarılı');
    this.additionalServiceItemBasket.push(model);
  }
  //removes item from basket for addition sevice
  removeAdditionalServiceItem(id: number) {
    this.additionalServiceItemBasket = this.additionalServiceItemBasket.filter(
      (model) => model.additionalServiceItemId !== id
    );
    this.toastrService.error('Çıkarıldı', 'Başarılı');
  }
  //checks if additional service item exist in the basket
  isBasketContainItem(id: number): boolean {
    if (
      this.additionalServiceItemBasket.filter(
        (e) => e.additionalServiceItemId === id
      ).length > 0
    ) {
      return true;
    } else return false;
  }
  //sends payment requests
  addPayment() {
    this.paymentLoading = true;
    let createPaymentModel: CreatePaymentModel = Object.assign(
      {},
      this.paymentAddForm.value
    );
    createPaymentModel.rentalId = this.activeRental.id;
    createPaymentModel.returnDate = this.returnDate;
    this.paymentService.add(createPaymentModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.paymentLoading = false;
          this.status = 'success';
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.paymentLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.paymentLoading = false;
      }
    );
    this.paymentLoading = false;
  }
  //sends request to know total price
  calculateTotalPrice() {
    const model: TotalPriceRequestModel = {
      rentalId: this.activeRental.id,
      returnDate: this.rentalAddForm.get('returnDate').value,
    };

    this.paymentService.calculateTotalPrice(model).subscribe(
      (response) => {
        if (response.success) {
          this.toastrService.success('Toplam Ücret:' + response, 'Başarılı');
          this.totalPrice = response.data;
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }
  //adds credit car
  addCustomerCardDetail() {
    let createCustomerCardDetailModel: CreateCustomerCardDetailModel =
      Object.assign({}, this.paymentAddForm.value);
    createCustomerCardDetailModel.customerId = this.customerId;
    this.customerCardDetailService.add(createCustomerCardDetailModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.isCardDetailSaved = true;

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
  //finds rental by id
  findById(id: number) {
    this.rentalService.findById(id).subscribe(
      (response: SingleResponseModel<RentalListModel>) => {
        if (response.success) {
          this.activeRental = response.data;
          // this.toastrService.success(response.message,"Başarılı");
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
