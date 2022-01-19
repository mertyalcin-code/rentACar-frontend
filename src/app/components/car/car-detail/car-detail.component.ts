import { CarService } from './../../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carId:number;
  constructor(private router: ActivatedRoute,
    private carService: CarService) { }

  ngOnInit() {
    this.carId = parseInt(this.router.snapshot.paramMap.get('carId'));    
  }

}
