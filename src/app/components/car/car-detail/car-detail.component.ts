import { LocalService } from './../../../services/local.service';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { CarListModel } from './../../../models/listModels/carListModel';

import { CarService } from './../../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  //variables
  carId: number;
  car: CarListModel;
  carLoading = false;
  //constructor
  constructor(private router: ActivatedRoute,
    private linkRouter: Router,
    private carService: CarService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localService: LocalService
  ) { }
  //starter
  ngOnInit() {
    this.carId = parseInt(this.router.snapshot.paramMap.get('carId'));
    this.getById(this.carId);
  }
  //find by id
  getById(carId: number): void {
    this.carLoading = true;
    this.carService.findById(carId).subscribe(
      (response: SingleResponseModel<CarListModel>) => {

        this.car = response.data;
        this.carLoading = false;
      }
    )
  }
  //routes the proper component by checking the role
  rentCar(id: number): void {
    
    if (this.authService.isEmployee()) {
      this.toastrService.info("Sistem Çalışanı Araç Kiralayamaz", "Başarısız");
      this.linkRouter.navigateByUrl('/home');
    }
    else if (this.authService.isCorporateCustomer()) {
      
      this.linkRouter.navigateByUrl('/rental/add/corporate-customer/' + id);
    }
    else if (this.authService.isIndividualCustomer()) {
      this.linkRouter.navigateByUrl('/rental/add/individual-customer/' + id);
    }
    else {
      this.localService.setJsonValue('selectedCar',JSON.stringify(id));
      this.linkRouter.navigateByUrl('/login');
    }

  }
}
