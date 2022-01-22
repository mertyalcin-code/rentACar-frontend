import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { UpdateAdditionalServiceItemModel } from './../../../models/updateModels/updateAdditionalServiceItemModel';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdditionalServiceItemService } from './../../../services/additionalServiceItem.service';
import { Component, OnInit } from '@angular/core';
import { AdditionalServiceItemListModel } from 'src/app/models/listModels/additionalServiceItemListModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-additional-service-item-update',
  templateUrl: './additional-service-item-update.component.html',
  styleUrls: ['./additional-service-item-update.component.css']
})
export class AdditionalServiceItemUpdateComponent implements OnInit {

  loading:boolean = false;
  item:AdditionalServiceItemListModel;
  constructor(private itemService : AdditionalServiceItemService,
              private toastrService : ToastrService,
              private router : ActivatedRoute
    ) { }

  ngOnInit() {
    this.findById(parseInt(this.router.snapshot.paramMap.get('id'))) ;  
  }
  itemUpdateForm = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
    price: new FormControl("",[Validators.required,Validators.min(0)])
  })
  clearItemUpdateForm() {
    this.itemUpdateForm.patchValue({
      name: '',   
      price: '', 
    });
  }
  findById(id:number){
    this.itemService.findById(id).subscribe(
      (response: SingleResponseModel<AdditionalServiceItemListModel>) => {
        if (response.success) {   
          this.item=response.data;
          this.itemUpdateForm.patchValue({
            name:response.data.name,   
            price:response.data.price,   
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
    let colorModel:UpdateAdditionalServiceItemModel = Object.assign({},this.itemUpdateForm.value);
    colorModel.id=this.item.id;
    this.itemService.update(colorModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.loading = false;
          this.clearItemUpdateForm();
          this.itemUpdateForm.markAsUntouched();
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