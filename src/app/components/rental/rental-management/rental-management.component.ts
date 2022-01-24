import { ListResponseModel } from './../../../models/responseModels/listResponseModel';
import { RentalListModel } from './../../../models/listModels/rentalListModel';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from './../../../services/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental-management',
  templateUrl: './rental-management.component.html',
  styleUrls: ['./rental-management.component.css'],
})
export class RentalManagementComponent implements OnInit {
  //variables
  rentals: RentalListModel[] = [];
  rentalLoading: boolean = false;
  deleteLoading = false;
  searchTerm: string = '';
  //constructor
  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) {}
  //starter
  ngOnInit(): void {
    this.findAll();
  }
  //finds all rentals
  findAll() {
    this.rentalLoading = true;
    this.rentalService.findAll().subscribe(
      (response: ListResponseModel<RentalListModel>) => {
        if (response.success) {
          this.rentalLoading = false;
          this.rentals = response.data;
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.rentalLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.rentalLoading = false;
      }
    );
  }
  //deletes rental
  delete(id: number) {
    this.deleteLoading = true;
    this.rentalService.delete(id).subscribe(
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
