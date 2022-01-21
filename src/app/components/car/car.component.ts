import { ColorListModel } from 'src/app/models/listModels/colorListModel';
import { ColorService } from './../../services/color.service';
import { CarListModel } from './../../models/listModels/carListModel';
import { Router, RouterModule } from '@angular/router';
import { CarService } from './../../services/car.service';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() selectedCity:any;
  @Input() selectedBrand:any;
  @Input() selectedColor:any;
  @Input() selectedSegment:any;
  constructor(private carService:CarService,private router:Router,private colorService :ColorService) { }
  
 
  colors:ColorListModel[]=[]
  cars:CarListModel[]=[];
  dataLoaded:boolean = false;
  ngOnInit(): void {
   
    this.getCars();
  }
  getCars(){ 
    this.carService.findAll().subscribe(
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


