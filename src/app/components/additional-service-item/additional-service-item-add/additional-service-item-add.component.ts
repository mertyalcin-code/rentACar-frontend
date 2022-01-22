import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdditionalServiceItemService } from './../../../services/additionalServiceItem.service';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-additional-service-item-add',
  templateUrl: './additional-service-item-add.component.html',
  styleUrls: ['./additional-service-item-add.component.css']
})
export class AdditionalServiceItemAddComponent implements OnInit {

  loading=false;
  constructor(
    private additionalServiceItemService:AdditionalServiceItemService,private toastrService:ToastrService) { }
  ngOnInit() {
  }
  itemAddForm = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
    price: new FormControl("",[Validators.required])
  })
  clearItemAddForm() {
    this.itemAddForm.patchValue({
      name: '',   
      price:''
    });
  }
  add(){
    this.loading = true;
    let itemModel = Object.assign({},this.itemAddForm.value);
    this.additionalServiceItemService.add(itemModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.loading = false;
          this.clearItemAddForm();
          this.itemAddForm.markAsUntouched();
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