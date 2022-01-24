import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { UpdateCityModel } from './../../../models/updateModels/updateCityModel';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CityService } from './../../../services/city.service';
import { Component, OnInit } from '@angular/core';
import { CityListModel } from 'src/app/models/listModels/cityListModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-update',
  templateUrl: './city-update.component.html',
  styleUrls: ['./city-update.component.css']
})
export class CityUpdateComponent implements OnInit {
  //variables
  loading:boolean = false;
  editCity:CityListModel;
  //constructor
  constructor(private cityService : CityService,
              private toastrService : ToastrService,
              private router : ActivatedRoute
    ) { }
    //starter
  ngOnInit() {
    this.findById(parseInt(this.router.snapshot.paramMap.get('id'))) ;  
  }
    //update form
  cityUpdateForm = new FormGroup({
    cityName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)])
  })
  clearCityUpdateForm() {
    this.cityUpdateForm.patchValue({
      cityName: '',   
    });
  }
    //finds city by id and patches the value to the form
  findById(id:number){
    this.cityService.findById(id).subscribe(
      (response: SingleResponseModel<CityListModel>) => {
        if (response.success) {   
          this.editCity=response.data;
          this.cityUpdateForm.patchValue({
            cityName:response.data.cityName,   
          });
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");

      }
    )
  }
    //sends update request
  update(){
    this.loading = true;
    let cityModel:UpdateCityModel = Object.assign({},this.cityUpdateForm.value);
    cityModel.id=this.editCity.id;
    this.cityService.update(cityModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {              
          this.loading = false;
          this.clearCityUpdateForm();
          this.cityUpdateForm.markAsUntouched();
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.loading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.loading = false;
      }
    )
  }
  
  
  
  
  }