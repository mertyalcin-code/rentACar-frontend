import { ListResponseModel } from './../../models/responseModels/listResponseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../services/color.service';
import { ColorListModel } from 'src/app/models/listModels/colorListModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  constructor(private colorService:ColorService,
    private toastrService: ToastrService
    
    ) { }
  colors:ColorListModel[]=[];
  colorsLoading:boolean = false;
  deleteLoading=false;
  searchTerm:string='';
  ngOnInit(): void {
    this.findAll();
  }
  findAll(){
    this.colorsLoading = true;   
    this.colorService.findAll().subscribe(
      (response: ListResponseModel<ColorListModel>) => {
        if (response.success) {           
          this.colorsLoading = false;
          this.colors=response.data;
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.colorsLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.colorsLoading = false;
      }
    )
  }
  delete(id:number){
    this.deleteLoading = true;   
    this.colorService.delete(id).subscribe(
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
