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

const routes: Routes = [
  { path: 'car-detail/:carId', component: CarDetailComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'rental', component: RentalComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: '', component: CarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
