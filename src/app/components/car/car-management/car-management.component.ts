import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { ListResponseModel } from './../../../models/responseModels/listResponseModel';
import { CarListModel } from './../../../models/listModels/carListModel';
import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../../services/car.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-management',
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.css']
})
export class CarManagementComponent implements OnInit {
  //variables
  cars: CarListModel[] = [];
  carsLoading: boolean = false;
  deleteLoading = false;
  searchTerm: string = '';
  //constructor
  constructor(private carService: CarService,
    private toastrService: ToastrService

  ) { }
  //starter
  ngOnInit(): void {
    this.findAll();
  }
  //finds all cars
  findAll() {
    this.carsLoading = true;
    this.carService.findAll().subscribe(
      (response: ListResponseModel<CarListModel>) => {
        if (response.success) {
          this.carsLoading = false;
          this.cars = response.data;
          this.toastrService.success(response.message, "Başarılı");
        } else {
          this.toastrService.warning(response.message, "Başarısız");
          this.carsLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, "Başarısız");
        this.carsLoading = false;
      }
    )
  }
  //deletes a car if there is no relation in the database
  delete(id: number) {
    this.deleteLoading = true;
    this.carService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.deleteLoading = false;
          this.findAll();
          this.toastrService.success(response.message, "Başarılı");
        } else {
          this.toastrService.warning(response.message, "Başarısız");
          this.deleteLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, "Başarısız");
        this.deleteLoading = false;
      }
    )
  }

}
