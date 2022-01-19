import { Router, RouterModule } from '@angular/router';
import { CarListModel } from './../../models/carListModel';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(private carService:CarService,private router:Router) { }

  cars:CarListModel[]=[];
  dataLoaded:boolean = false;
  ngOnInit(): void {
    this.getCars();
  }
  getCars(){ 
    this.carService.getCars().subscribe(
      response=>{
        this.dataLoaded = false;
        this.cars = response.data;
        this.dataLoaded = true;
      }
    )
  }
  routeToCarDetail(carId:number):void{
    let url="/car-detail/"+carId
    this.router.navigateByUrl(url);
  }



}