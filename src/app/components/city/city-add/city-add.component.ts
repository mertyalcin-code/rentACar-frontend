import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CityService } from './../../../services/city.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
})
export class CityAddComponent implements OnInit {
  //variables
  loading = false;
  //constructor
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService
  ) {}
  //starter
  ngOnInit() {}
  //add form
  cityAddForm = new FormGroup({
    cityName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
  });
  //clear city
  clearCityAddForm() {
    this.cityAddForm.patchValue({
      cityName: '',
    });
  }
  //adds a city
  add() {
    this.loading = true;
    let cityModel = Object.assign({}, this.cityAddForm.value);
    this.cityService.add(cityModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.loading = false;
          this.clearCityAddForm();
          this.cityAddForm.markAsUntouched();
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.loading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.loading = false;
      }
    );
  }
}
