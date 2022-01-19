import { CarListModel } from './../../models/carListModel';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(private carService:CarService) { }
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
}