import { UpdateRentalModel } from './../../../models/updateModels/updateRentalModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { CityListModel } from 'src/app/models/listModels/cityListModel';
import { CityService } from './../../../services/city.service';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from './../../../services/rental.service';
import { RentalListModel } from './../../../models/listModels/rentalListModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.css'],
})
export class RentalUpdateComponent implements OnInit {
  //varaibles
  citiesLoading: boolean = false;
  loading: boolean = false;
  editrental: RentalListModel;
  cities: CityListModel[] = [];
  //constructor
  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router: ActivatedRoute,
    private cityService: CityService
  ) {}
  //starter
  ngOnInit() {
    this.findById(parseInt(this.router.snapshot.paramMap.get('id')));
    this.getCities();
  }
  //rental form
  rentalUpdateForm = new FormGroup({
    returnDate: new FormControl('', [Validators.required]),
    returnedKilometer: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
    returnCityId: new FormControl('', [Validators.required]),
  });
  //clear form
  clearRentalUpdateForm() {
    this.rentalUpdateForm.patchValue({
      returnDate: '',
      returnedKilometer: '',
      returnCityId: '',
    });
  }
  //finds rental by id and pactches the value
  findById(id: number) {
    this.rentalService.findById(id).subscribe(
      (response: SingleResponseModel<RentalListModel>) => {
        if (response.success) {
          this.editrental = response.data;
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }
  //sends request to update rental
  update() {
    this.loading = true;
    let rentalModel: UpdateRentalModel = Object.assign(
      {},
      this.rentalUpdateForm.value
    );
    rentalModel.id = this.editrental.id;
    this.rentalService.update(rentalModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.loading = false;
          this.clearRentalUpdateForm();
          this.rentalUpdateForm.markAsUntouched();
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
  //finds all cities
  getCities() {
    this.citiesLoading = true;
    this.cityService.findAll().subscribe(
      (response) => {
        if (response.success) {
          this.cities = response.data;
          //   this.toastrService.success(response.message,"Başarılı");
          this.citiesLoading = false;
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.citiesLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.citiesLoading = false;
      }
    );
  }
}
