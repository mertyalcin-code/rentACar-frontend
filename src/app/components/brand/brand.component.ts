import { ListResponseModel } from './../../models/responseModels/listResponseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { BrandListModel } from './../../models/listModels/brandListModel';

import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({ // buraya decorator denir. 
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  searchTerm:string = ''; 
  brands:BrandListModel[] = [];
  brandsLoading: boolean = false;
  deleteLoading:boolean = false;
  constructor(private brandService:BrandService,
              private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.brandsLoading = true;   
    this.brandService.findAll().subscribe(
      (response: ListResponseModel<BrandListModel>) => {
        if (response.success) {           
          this.brandsLoading = false;
          this.brands=response.data;
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.brandsLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.brandsLoading = false;
      }
    )
  }
  
  
  delete(id:number){
    this.deleteLoading = true;   
    this.brandService.delete(id).subscribe(
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