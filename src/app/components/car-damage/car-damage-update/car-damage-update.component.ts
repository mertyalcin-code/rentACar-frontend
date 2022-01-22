import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { UpdateCarDamageModel } from './../../../models/updateModels/updateCarDamageModel';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDamageService } from './../../../services/car-damage.service';
import { CarDamageListModel } from 'src/app/models/listModels/carDamageListModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-damage-update',
  templateUrl: './car-damage-update.component.html',
  styleUrls: ['./car-damage-update.component.css']
})
export class CarDamageUpdateComponent implements OnInit {

  loading:boolean = false;
  editCarDamage:CarDamageListModel;
  constructor(private carDamageService : CarDamageService,
              private toastrService : ToastrService,
              private router : ActivatedRoute
    ) { }

  ngOnInit() {
    this.findById(parseInt(this.router.snapshot.paramMap.get('id'))) ;  
  }
  carDamageUpdateForm = new FormGroup({
    carId: new FormControl("",[Validators.required,]),
    description: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)])
  })
  clearCarDamageUpdateForm() {
    this.carDamageUpdateForm.patchValue({
      carId: '',   
      description: '',   
    });
  }
  findById(id:number){
    this.carDamageService.findById(id).subscribe(
      (response: SingleResponseModel<CarDamageListModel>) => {
        if (response.success) {   
          console.log(response.data)
          this.editCarDamage=response.data;
          this.carDamageUpdateForm.patchValue({
            carId:response.data.carId,   
            description:response.data.description, 
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
  
  update(){
    this.loading = true;
    let carDamageModel:UpdateCarDamageModel = Object.assign({},this.carDamageUpdateForm.value);
    carDamageModel.id=this.editCarDamage.id;
    this.carDamageService.update(carDamageModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {               
          this.loading = false;
          this.clearCarDamageUpdateForm();
          this.carDamageUpdateForm.markAsUntouched();
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