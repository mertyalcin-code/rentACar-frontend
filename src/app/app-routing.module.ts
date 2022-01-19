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
  { path: 'contact', component: ContactComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '', component: CarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
