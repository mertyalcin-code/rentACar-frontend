import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CarMaintenanceService } from 'src/app/services/car-maintenance.service';

@Component({
  selector: 'app-car-maintenance-add',
  templateUrl: './car-maintenance-add.component.html',
  styleUrls: ['./car-maintenance-add.component.css']
})
export class CarMaintenanceAddComponent implements OnInit {

  loading=false;
  constructor(
    private carMaintenanceService:CarMaintenanceService,private toastrService:ToastrService) { }
  ngOnInit() {
  }
  carMaintenanceAddForm = new FormGroup({
    carId: new FormControl("",[Validators.required]),
    maintenanceStart: new FormControl("",[Validators.required])
  })
  clearColorAddForm() {
    this.carMaintenanceAddForm.patchValue({
      carId: '',   
      maintenanceStart: '', 
    });
  }
  add(){
    this.loading = true;
    let colorModel = Object.assign({},this.carMaintenanceAddForm.value);
    this.carMaintenanceService.add(colorModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {              
          this.loading = false;
          this.clearColorAddForm();
          this.carMaintenanceAddForm.markAsUntouched();
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