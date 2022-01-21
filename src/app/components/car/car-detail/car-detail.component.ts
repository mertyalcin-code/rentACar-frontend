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
    private carService: CarService) { }

  ngOnInit() {
    this.carId = parseInt(this.router.snapshot.paramMap.get('carId'));    
    this.getById(this.carId);
  }
  getById(carId:number):void{ 
    this.carService.findById(carId).subscribe(
      response=>{
        this.dataLoaded = false;
        this.car = response.data;
        this.dataLoaded = true;
      }
    )
  }
  
  rentCar(id:number):void{
    this.linkRouter.navigateByUrl('/rental/add/'+id);
  }
}
