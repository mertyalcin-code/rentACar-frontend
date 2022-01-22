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
import { RentalAddComponent } from './components/rental/rental-add/rental-add.component';
import { CityComponent } from './components/city/city.component';
import { CityAddComponent } from './components/city/city-add/city-add.component';
import { SegmentComponent } from './components/segment/segment.component';
import { CarDamageComponent } from './components/car-damage/car-damage.component';
import { CarMaintenanceComponent } from './components/car-maintenance/car-maintenance.component';

const routes: Routes = [
  { path: 'car-detail/:carId', component: CarDetailComponent },
  { path: 'cars', component: CarComponent },

  { path: 'contact', component: ContactComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'my-account/cards', component: CreditCardComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'rental', component: RentalComponent },

  { path: 'car', component: CarManagementComponent },
  { path: 'car/add', component: CarAddComponent },
  { path: 'car/update/:id', component: CarUpdateComponent},

  { path: 'car-damage', component: CarDamageComponent },
  { path: 'car-damage/add', component: CarDamageAddComponent },
  { path: 'car-damage/update/:id', component: CarDamageUpdateComponent },

  { path: 'car-maintenence', component: CarMaintenanceComponent },
  { path: 'car-maintenence/add', component: CarMaintenanceAddComponent },
  { path: 'car-maintenence/update/:id', component: CarMaintenanceUpdateComponent },
  
  { path: 'brand', component: BrandComponent },
  { path: 'brand/add', component: BrandAddComponent },
  { path: 'brand/update/:id', component: BrandUpdateComponent },

  { path: 'color', component: ColorComponent },
  { path: 'color/add', component: ColorAddComponent },
  { path: 'color/update/:id', component: ColorUpdateComponent },

  { path: 'city', component: CityComponent },
  { path: 'city/add', component: CityAddComponent },
  { path: 'city/update/:id', component: CityUpdateComponent },

  { path: 'segment', component: SegmentComponent },
  { path: 'segment/add', component: SegmentAddComponent },
  { path: 'segment/update/:id', component: SegmentUpdateComponent },

  { path: 'rental/add/:carId', component:RentalAddComponent },
  { path: 'my-rentals', component:MyRentalComponent },
  { path: 'employee-panel', component:EmployeePanelComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
