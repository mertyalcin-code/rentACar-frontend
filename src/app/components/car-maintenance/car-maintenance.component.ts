import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ListResponseModel } from './../../models/responseModels/listResponseModel';
import { ToastrService } from 'ngx-toastr';
import { CarMaintenanceService } from './../../services/car-maintenance.service';
import { Component, OnInit } from '@angular/core';
import { CarMaintenanceListModel } from 'src/app/models/listModels/carMaintenanceListModel';

@Component({
  selector: 'app-car-maintenance',
  templateUrl: './car-maintenance.component.html',
  styleUrls: ['./car-maintenance.component.css'],
})
export class CarMaintenanceComponent implements OnInit {
  //variables
  carMaintenances: CarMaintenanceListModel[] = [];
  maintenancesLoading: boolean = false;
  deleteLoading = false;
  searchTerm: string = '';
  //constructor
  constructor(
    private carMaintenanceService: CarMaintenanceService,
    private toastrService: ToastrService
  ) {}
  //starter
  ngOnInit(): void {
    this.findAll();
  }
  //finds all
  findAll() {
    this.maintenancesLoading = true;
    this.carMaintenanceService.findAll().subscribe(
      (response: ListResponseModel<CarMaintenanceListModel>) => {
        if (response.success) {
          this.maintenancesLoading = false;
          this.carMaintenances = response.data;
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.maintenancesLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.maintenancesLoading = false;
      }
    );
  }
  //deletes a car maintenance
  delete(id: number) {
    this.deleteLoading = true;
    this.carMaintenanceService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.deleteLoading = false;
          this.findAll();
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.deleteLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.deleteLoading = false;
      }
    );
  }
}
