import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ColorListModel } from 'src/app/models/listModels/colorListModel';
import { ListResponseModel } from './../../models/responseModels/listResponseModel';
import { ToastrService } from 'ngx-toastr';
import { CarDamageService } from './../../services/car-damage.service';
import { Component, OnInit } from '@angular/core';
import { CarDamageListModel } from 'src/app/models/listModels/carDamageListModel';

@Component({
  selector: 'app-car-damage',
  templateUrl: './car-damage.component.html',
  styleUrls: ['./car-damage.component.css']
})
export class CarDamageComponent implements OnInit {
  //variables
  damages: CarDamageListModel[] = [];
  damagesLoading: boolean = false;
  deleteLoading = false;
  searchTerm: string = '';
  selectedCarId: number;
  //constructor
  constructor(private carDamageService: CarDamageService,
    private toastrService: ToastrService
  ) { }
  //starter
  ngOnInit(): void {
  }
  //car ıd form to find car damages
  carIdForm = new FormGroup({
    carId: new FormControl("", [Validators.required]),
  })
  //clear
  clearCarIdForm() {
    this.carIdForm.patchValue({
      carId: '',
    });
  }
  //finds all car damages by car id
  findAllByCarId() {
    let carId = this.carIdForm.get('carId').value;
    this.damagesLoading = true;
    this.carDamageService.findAllByCarId(carId).subscribe(
      (response: ListResponseModel<CarDamageListModel>) => {
        if (response.success) {
          this.selectedCarId = carId;
          this.clearCarIdForm();
          this.damagesLoading = false;
          this.damages = response.data;
          this.toastrService.success(response.message, "Başarılı");
        } else {
          this.toastrService.warning(response.message, "Başarısız");
          this.damagesLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, "Başarısız");
        this.damagesLoading = false;
      }
    )
  }
  //deletes a damage
  delete(id: number) {
    this.deleteLoading = true;
    this.carDamageService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.deleteLoading = false;
          this.findAllByCarId();
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
