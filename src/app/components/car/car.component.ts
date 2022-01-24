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
  //inputs  from homepage 
  @Input() selectedCity: any;
  @Input() selectedBrand: any;
  @Input() selectedColor: any;
  @Input() selectedSegment: any;
  //variables
  colors: ColorListModel[] = []
  cars: CarListModel[] = [];
  carsLoading: boolean = false;
  //constructor
  constructor(
    private carService: CarService,
    private router: Router,
    private colorService: ColorService) { }

  //starter
  ngOnInit(): void {
    this.getCars();
  }
  //lists available cars
  getCars() {
    this.carsLoading = true;
    this.carService.findAllAvailable().subscribe(
      response => {
        this.cars = response.data;
        this.carsLoading = false;
      }
    )
  }
  //navigates to car detail
  routeToCarDetail(carId: number): void {
    let url = "/car-detail/" + carId
    this.router.navigateByUrl(url);
  }

}


