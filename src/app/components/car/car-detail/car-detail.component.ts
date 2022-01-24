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
  carId:number;
  car:CarListModel;
  dataLoaded = false;
  constructor(private router: ActivatedRoute,
    private linkRouter:Router,
    private carService: CarService,
    private authService: AuthService,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.carId = parseInt(this.router.snapshot.paramMap.get('carId'));    
    this.getById(this.carId);
  }
  getById(carId:number):void{ 
    this.carService.findById(carId).subscribe(
      (response:SingleResponseModel<CarListModel>)=>{
        this.dataLoaded = false;
        this.car = response.data;
        this.dataLoaded = true;
      }
    )
  }
  
  rentCar(id:number):void{
    if(this.authService.isEmployee()){
      this.toastrService.info("Sistem Çalışanı Araç Kiralayamaz","Başarısız");
      this.linkRouter.navigateByUrl('/home');
    }
    else if(this.authService.isCorporateCustomer()){
      
      this.linkRouter.navigateByUrl('/rental/add/corporate-customer/'+id);
    }
    else if(this.authService.isIndividualCustomer()){
      this.linkRouter.navigateByUrl('/rental/add/individual-customer/'+id);
    }
    else {
      this.linkRouter.navigateByUrl('/login');
    }
   
  }
}
