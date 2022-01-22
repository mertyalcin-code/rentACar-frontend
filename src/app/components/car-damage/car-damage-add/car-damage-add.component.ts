import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { CarDamageService } from './../../../services/car-damage.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../../services/color.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-damage-add',
  templateUrl: './car-damage-add.component.html',
  styleUrls: ['./car-damage-add.component.css']
})
export class CarDamageAddComponent implements OnInit {
  loading=false;
  constructor(
    private carDamageService:CarDamageService,private toastrService:ToastrService) { }
  ngOnInit() {
  }
  carDamageAddForm = new FormGroup({
    carId: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)])
  })
  clearCarDamageAddForm() {
    this.carDamageAddForm.patchValue({
      carId: '',  
      description:'' 
    });
  }
  add(){
    this.loading = true;
    let carDamageModel = Object.assign({},this.carDamageAddForm.value);
    this.carDamageService.add(carDamageModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {             
          this.loading = false;
          this.clearCarDamageAddForm();
          this.carDamageAddForm.markAsUntouched();
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