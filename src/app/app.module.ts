import { PaymentAddComponent } from './components/payment/payment-add/payment-add.component';
import { PaymentUpdateComponent } from './components/payment/payment-update/payment-update.component';
import { PromoCodeUpdateComponent } from './components/promo-code/promo-code-update/promo-code-update.component';
import { AdditionalServiceItemUpdateComponent } from './components/additional-service-item/additional-service-item-update/additional-service-item-update.component';
import { AdditionalServiceItemAddComponent } from './components/additional-service-item/additional-service-item-add/additional-service-item-add.component';
import { CarMaintenanceUpdateComponent } from './components/car-maintenance/car-maintenance-update/car-maintenance-update.component';
import { CarMaintenanceComponent } from './components/car-maintenance/car-maintenance.component';
import { CarDamageUpdateComponent } from './components/car-damage/car-damage-update/car-damage-update.component';
import { CarDamageAddComponent } from './components/car-damage/car-damage-add/car-damage-add.component';
import { CarDamageService } from './services/car-damage.service';
import { SegmentUpdateComponent } from './components/segment/segment-update/segment-update.component';
import { SegmentComponent } from './components/segment/segment.component';
import { SegmentAddComponent } from './components/segment/segment-add/segment-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarManagementComponent } from './components/car/car-management/car-management.component';
import { CityUpdateComponent } from './components/city/city-update/city-update.component';
import { CityAddComponent } from './components/city/city-add/city-add.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { CorporateCustomerComponent } from './components/customer/corporate-customer/corporate-customer.component';
import { CityComponent } from './components/city/city.component';
import { RentalManagementComponent } from './components/rental/rental-management/rental-management.component';
import { EmployeePanelComponent } from './components/employee-panel/employee-panel.component';
import { HomeComponent } from './components/home/home.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { MyRentalComponent } from './components/rental/my-rental/my-rental.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { RentalComponent } from './components/rental/rental.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import { CommonModule } from '@angular/common';
import { RentalAddComponent } from './components/rental/rental-add/rental-add.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdditionalServiceItemComponent } from './components/additional-service-item/additional-service-item.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarDamageComponent } from './components/car-damage/car-damage.component';
import { CarMaintenanceAddComponent } from './components/car-maintenance/car-maintenance-add/car-maintenance-add.component';
import { PromoCodeComponent } from './components/promo-code/promo-code.component';
import { PromoCodeAddComponent } from './components/promo-code/promo-code-add/promo-code-add.component';
@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
    CarDetailComponent,
    FooterComponent,
    NavBarComponent,
    ContactComponent,
    MyAccountComponent,
    AboutUsComponent,
    RentalComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    RentalAddComponent,
    MyRentalComponent,
    CreditCardComponent,HomeComponent,
    EmployeePanelComponent,
    RentalManagementComponent,
    CityComponent,
    AdditionalServiceItemComponent,
    InvoiceComponent,
    CorporateCustomerComponent,
    PaymentComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    CityAddComponent,
    CityUpdateComponent,
    CarManagementComponent,
    CarUpdateComponent,
    SegmentComponent,
    SegmentAddComponent,
    SegmentUpdateComponent,
    CarDamageComponent,
    CarDamageAddComponent,
    CarDamageUpdateComponent,
    CarMaintenanceComponent,
    CarMaintenanceAddComponent,
    CarMaintenanceUpdateComponent,
    AdditionalServiceItemComponent,
    AdditionalServiceItemAddComponent,
    AdditionalServiceItemUpdateComponent,
    PromoCodeComponent,
    PromoCodeUpdateComponent,
    PromoCodeAddComponent,
    PaymentComponent,
    PaymentUpdateComponent,
    PaymentAddComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, 
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
