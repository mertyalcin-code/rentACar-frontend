import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { AdditionalServiceItemListModel } from './../../models/listModels/additionalServiceItemListModel';
import { ListResponseModel } from './../../models/responseModels/listResponseModel';
import { ToastrService } from 'ngx-toastr';
import { AdditionalServiceService } from './../../services/additionalService.service';
import { Component, OnInit } from '@angular/core';
import { AdditionalServiceItemService } from 'src/app/services/additionalServiceItem.service';

@Component({
  selector: 'app-additional-service-item',
  templateUrl: './additional-service-item.component.html',
  styleUrls: ['./additional-service-item.component.css']
})
export class AdditionalServiceItemComponent implements OnInit {

  constructor(private additionalServiceItemService:AdditionalServiceItemService,
    private toastrService: ToastrService
    
    ) { }
  items:AdditionalServiceItemListModel[]=[];
  itemsLoading:boolean = false;
  deleteLoading=false;
  searchTerm:string='';
  ngOnInit(): void {
    this.findAll();
  }
  findAll(){
    this.itemsLoading = true;   
    this.additionalServiceItemService.findAll().subscribe(
      (response: ListResponseModel<AdditionalServiceItemListModel>) => {
        if (response.success) {           
          this.itemsLoading = false;
          this.items=response.data;
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.itemsLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.itemsLoading = false;
      }
    )
  }
  delete(id:number){
    this.deleteLoading = true;   
    this.additionalServiceItemService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.deleteLoading = false;
          this.findAll();
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.deleteLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.deleteLoading = false;
      }
    )
  }

}

