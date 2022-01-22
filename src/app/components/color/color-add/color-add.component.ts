import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { ColorService } from './../../../services/color.service';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  loading=false;
  constructor(
    private colorService:ColorService,private toastrService:ToastrService) { }
  ngOnInit() {
  }
  colorAddForm = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)])
  })
  clearColorAddForm() {
    this.colorAddForm.patchValue({
      name: '',   
    });
  }
  add(){
    this.loading = true;
    let colorModel = Object.assign({},this.colorAddForm.value);
    this.colorService.add(colorModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          console.log(response)                
          this.loading = false;
          this.clearColorAddForm();
          this.colorAddForm.markAsUntouched();
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