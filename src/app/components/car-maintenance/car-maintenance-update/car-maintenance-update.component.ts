import { UpdateCarMaintenanceModel } from './../../../models/updateModels/updateCarMaintenanceModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { UpdateColorModel } from './../../../models/updateModels/updateColorModel';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { CarMaintenanceListModel } from './../../../models/listModels/carMaintenanceListModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarMaintenanceService } from './../../../services/car-maintenance.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-maintenance-update',
  templateUrl: './car-maintenance-update.component.html',
  styleUrls: ['./car-maintenance-update.component.css']
})
export class CarMaintenanceUpdateComponent implements OnInit {

  loading:boolean = false;
  editColor:CarMaintenanceListModel;
  constructor(private carMaintenanceService : CarMaintenanceService,
              private toastrService : ToastrService,
              private router : ActivatedRoute
    ) { }

  ngOnInit() {
    this.findById(parseInt(this.router.snapshot.paramMap.get('id'))) ;  
  }
  carMaintenanceUpdateForm = new FormGroup({
    carId: new FormControl("",[Validators.required]),
    maintenanceStart: new FormControl("",[Validators.required]),
    maintenanceEnd: new FormControl("",[Validators.required])
  })
  clearCarMaintenanceUpdateForm() {
    this.carMaintenanceUpdateForm.patchValue({
      carId: '',   
      maintenanceStart:'',
      maintenanceEnd: '', 
    });
  }
  findById(id:number){
    this.carMaintenanceService.findById(id).subscribe(
      (response: SingleResponseModel<CarMaintenanceListModel>) => {
        if (response.success) {   
          console.log(response.data)
          this.editColor=response.data;
          this.carMaintenanceUpdateForm.patchValue({
            carId:response.data.carId,   
            maintenanceStart:response.data.maintenanceStart,  
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
    let carMaintanenceModel:UpdateCarMaintenanceModel = Object.assign({},this.carMaintenanceUpdateForm.value);
    carMaintanenceModel.id=this.editColor.id;
    this.carMaintenanceService.update(carMaintanenceModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.loading = false;
          this.clearCarMaintenanceUpdateForm();
          this.carMaintenanceUpdateForm.markAsUntouched();
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