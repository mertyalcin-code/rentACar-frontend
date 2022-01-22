import { CorporateCustomerUpdateComponent } from './components/customer/corporate-customer/corporate-customer-update/corporate-customer-update.component';
import { IndividualCustomerUpdateComponent } from './components/customer/individualCustomer/individual-customer-update/individual-customer-update.component';
import { EmployeeGuard } from './guards/employee.guard';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { InvoiceCorporateCustomerDetailComponent } from './components/invoice/invoice-corporate-customer-detail/invoice-corporate-customer-detail.component';
import { InvoiceIndividualCustomerDetailComponent } from './components/invoice/invoice-individual-customer-detail/invoice-individual-customer-detail.component';
import { RentalUpdateComponent } from './components/rental/rental-update/rental-update.component';
import { RentalManagementComponent } from './components/rental/rental-management/rental-management.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { PaymentUpdateComponent } from './components/payment/payment-update/payment-update.component';
import { PaymentAddComponent } from './components/payment/payment-add/payment-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PromoCodeUpdateComponent } from './components/promo-code/promo-code-update/promo-code-update.component';
import { PromoCodeComponent } from './components/promo-code/promo-code.component';
import { AdditionalServiceItemUpdateComponent } from './components/additional-service-item/additional-service-item-update/additional-service-item-update.component';
import { AdditionalServiceItemAddComponent } from './components/additional-service-item/additional-service-item-add/additional-service-item-add.component';
import { CarMaintenanceUpdateComponent } from './components/car-maintenance/car-maintenance-update/car-maintenance-update.component';
import { CarMaintenanceAddComponent } from './components/car-maintenance/car-maintenance-add/car-maintenance-add.component';
import { CarDamageUpdateComponent } from './components/car-damage/car-damage-update/car-damage-update.component';
import { CarDamageAddComponent } from './components/car-damage/car-damage-add/car-damage-add.component';
import { SegmentUpdateComponent } from './components/segment/segment-update/segment-update.component';
import { SegmentAddComponent } from './components/segment/segment-add/segment-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarManagementComponent } from './components/car/car-management/car-management.component';
import { CityUpdateComponent } from './components/city/city-update/city-update.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { EmployeePanelComponent } from './components/employee-panel/employee-panel.component';
import { HomeComponent } from './components/home/home.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { MyRentalComponent } from './components/rental/my-rental/my-rental.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ContactComponent } from './components/contact/contact.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { RentalAddForIndividualCustomerComponent } from './components/rental/rental-add-individual-customer/rental-add-individual-customer.component';
import { CityComponent } from './components/city/city.component';
import { CityAddComponent } from './components/city/city-add/city-add.component';
import { SegmentComponent } from './components/segment/segment.component';
import { CarDamageComponent } from './components/car-damage/car-damage.component';
import { CarMaintenanceComponent } from './components/car-maintenance/car-maintenance.component';
import { AdditionalServiceItemComponent } from './components/additional-service-item/additional-service-item.component';
import { PromoCodeAddComponent } from './components/promo-code/promo-code-add/promo-code-add.component';
import { CorporateCustomerAddComponent } from './components/customer/corporate-customer/corporate-customer-add/corporate-customer-add.component';
import { IndividualCustomerAddComponent } from './components/customer/individualCustomer/individual-customer-add/individual-customer-add.component';
import { RentalAddCorporateCustomerComponent } from './components/rental/rental-add-corporate-customer/rental-add-corporate-customer.component';

const routes: Routes = [
  // public url
  { path: 'car-detail/:carId', component: CarDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'corporate-customer-register', component: CorporateCustomerAddComponent },
  { path: 'individual-customer-register', component: IndividualCustomerAddComponent },
  { path: 'about-us', component: AboutUsComponent },
  //auth needed
  { path: 'my-account', component: MyAccountComponent,canActivate:[LoginGuard] },
  { path: 'my-account/cards', component: CreditCardComponent,canActivate:[LoginGuard] },
  { path: 'my-account/individual/update', component: IndividualCustomerUpdateComponent,canActivate:[LoginGuard] },
  { path: 'my-account/corporate/update', component: CorporateCustomerUpdateComponent,canActivate:[LoginGuard] },
  { path: 'my-rentals', component:MyRentalComponent,canActivate:[LoginGuard] },
  { path: 'rental/add/individual-customer/:carId', component:RentalAddForIndividualCustomerComponent,canActivate:[LoginGuard] },
  { path: 'rental/add/corporate-customer/:carId', component:RentalAddCorporateCustomerComponent,canActivate:[LoginGuard] },
  //employee only
  { path: 'car', component: CarManagementComponent,canActivate:[EmployeeGuard] },
  { path: 'car/add', component: CarAddComponent,canActivate:[EmployeeGuard] },
  { path: 'car/update/:id', component: CarUpdateComponent,canActivate:[EmployeeGuard]},

  { path: 'car-damage', component: CarDamageComponent,canActivate:[EmployeeGuard] },
  { path: 'car-damage/add', component: CarDamageAddComponent ,canActivate:[EmployeeGuard]},
  { path: 'car-damage/update/:id', component: CarDamageUpdateComponent ,canActivate:[EmployeeGuard]},

  { path: 'car-maintenance', component: CarMaintenanceComponent,canActivate:[EmployeeGuard] },
  { path: 'car-maintenance/add', component: CarMaintenanceAddComponent,canActivate:[EmployeeGuard] },
  { path: 'car-maintenance/update/:id', component: CarMaintenanceUpdateComponent,canActivate:[EmployeeGuard] },
  
  { path: 'brand', component: BrandComponent,canActivate:[EmployeeGuard] },
  { path: 'brand/add', component: BrandAddComponent,canActivate:[EmployeeGuard] },
  { path: 'brand/update/:id', component: BrandUpdateComponent,canActivate:[EmployeeGuard] },

  { path: 'color', component: ColorComponent ,canActivate:[EmployeeGuard]},
  { path: 'color/add', component: ColorAddComponent ,canActivate:[EmployeeGuard]},
  { path: 'color/update/:id', component: ColorUpdateComponent ,canActivate:[EmployeeGuard]},

  { path: 'city', component: CityComponent,canActivate:[EmployeeGuard] },
  { path: 'city/add', component: CityAddComponent,canActivate:[EmployeeGuard] },
  { path: 'city/update/:id', component: CityUpdateComponent,canActivate:[EmployeeGuard] },

  { path: 'segment', component: SegmentComponent,canActivate:[EmployeeGuard] },
  { path: 'segment/add', component: SegmentAddComponent,canActivate:[EmployeeGuard] },
  { path: 'segment/update/:id', component: SegmentUpdateComponent,canActivate:[EmployeeGuard] },

  { path: 'promo-code', component: PromoCodeComponent,canActivate:[EmployeeGuard] },
  { path: 'promo-code/add', component: PromoCodeAddComponent,canActivate:[EmployeeGuard] },
  { path: 'promo-code/update/:id', component: PromoCodeUpdateComponent,canActivate:[EmployeeGuard] },

  { path: 'additional-service-item', component: AdditionalServiceItemComponent,canActivate:[EmployeeGuard] },
  { path: 'additional-service-item/add', component: AdditionalServiceItemAddComponent,canActivate:[EmployeeGuard] },
  { path: 'additional-service-item/update/:id', component: AdditionalServiceItemUpdateComponent,canActivate:[EmployeeGuard]},

  { path: 'payment', component: PaymentComponent,canActivate:[EmployeeGuard] },
  { path: 'payment/add', component: PaymentAddComponent,canActivate:[EmployeeGuard] },
  { path: 'payment/update/:id', component: PaymentUpdateComponent,canActivate:[EmployeeGuard]},

  { path: 'invoice', component: InvoiceComponent ,canActivate:[EmployeeGuard]},
  { path: 'invoice/individual-customer/:id', component: InvoiceIndividualCustomerDetailComponent,canActivate:[EmployeeGuard] },
  { path: 'invoice/corporate-customer/:id', component: InvoiceCorporateCustomerDetailComponent,canActivate:[EmployeeGuard] },

  { path: 'rental-management', component: RentalManagementComponent ,canActivate:[EmployeeGuard]},
  { path: 'rental-management/update/:id', component: RentalUpdateComponent ,canActivate:[EmployeeGuard]},



  { path: 'employee-panel', component:EmployeePanelComponent },

  //home
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
