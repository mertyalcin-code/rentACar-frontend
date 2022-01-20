import { ResponseModel } from './../../../models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ColorListModel } from './../../../models/listModels/colorListModel';
import { BrandListModel } from './../../../models/listModels/brandListModel';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SegmentService } from './../../../services/segment.service';
import { ColorService } from './../../../services/color.service';
import { CityService } from './../../../services/city.service';
import { BrandService } from './../../../services/brand.service';
import { CarService } from './../../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { SegmentListModel } from 'src/app/models/listModels/segmentListModel';
import { CityListModel } from 'src/app/models/listModels/cityListModel';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  colorsLoading = false;
  brandsLoading = false;
  segmentsLoading = false;
  citiesLoading = false;
  carAddLoading = false;
  brands :BrandListModel[]=[]
  colors :ColorListModel[]=[]
  segments :SegmentListModel[]=[]
  cities :CityListModel[]=[]
  constructor(
    private carService:CarService,
    private brandService: BrandService,
    private cityService: CityService,
    private colorService: ColorService,
    private segmentService: SegmentService,
    private toastrService: ToastrService 
    ) { }
    carName:string
    brandId:number
    colorId:number
    dailyPrice:number
    model:number
    findexScore:number
    kilometer:number
    imageUrl:string
    description:string
    minAge:number
    segmentId:number
    cityId:number

  ngOnInit() {
    this.getBrands();
    this.getColors();
    this.getCities();
    this.getSegments();
  }
  carAddForm = new FormGroup({
    carName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
    model: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(60)]),
    brandId: new FormControl("",[Validators.required,Validators.min(1)]),
    colorId: new FormControl("",[Validators.required,,Validators.min(1)]),
    dailyPrice: new FormControl("",[Validators.required,,Validators.min(0)]),
    findexScore: new FormControl("",[Validators.required,Validators.min(650),Validators.max(1900)]),
    kilometer: new FormControl("",[Validators.required,Validators.min(0)]),
    imageUrl: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required,Validators.minLength(0),Validators.maxLength(250)]),
    minAge: new FormControl("",[Validators.required,Validators.min(18),Validators.min(50)]),
    segmentId: new FormControl("",[Validators.required,Validators.min(1)]),
    cityId: new FormControl("",[Validators.required,Validators.min(1)]),
  })
  clearBrandAddForm() {
    this.carAddForm.patchValue({
      carName: '',
      brandId: '',
      colorId: '',
      dailyPrice: '',
      findexScore: '',
      kilometer: '',
      imageUrl: '',
      description: '',
      minAge: '',
      segmentId: '',
      cityId: '',
    });
  }
  getBrands(){
    this.brandsLoading = true;
    this.brandService.findAll().subscribe(response =>{
      if(response.success){
        this.brands = response.data;
 //       this.toastrService.success(response.message,"Başarılı");
        this.brandsLoading = false;
      }else{
        this.toastrService.warning(response.message,"Başarısız");
        this.brandsLoading = false;
      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
      this.brandsLoading = false;
    }
    )
  }
  getColors(){
    this.colorsLoading = true;
    this.colorService.findAll().subscribe(response =>{
      if(response.success){
        this.colors = response.data;
   //     this.toastrService.success(response.message,"Başarılı");
        this.colorsLoading = false;
      }else{
        this.toastrService.warning(response.message,"Başarısız");
        this.colorsLoading = false;
      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
      this.colorsLoading = false;
    }
    )
  }
  getSegments(){
    this.segmentsLoading = true;
    this.segmentService.findAll().subscribe(response =>{ console.log(response)
      if(response.success){
        this.segments = response.data;
 //       this.toastrService.success(response.message,"Başarılı");
        this.segmentsLoading = false;
      }else{
        this.toastrService.warning(response.message,"Başarısız");
        this.segmentsLoading = false;
      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
      this.segmentsLoading = false;
    }
    )
  }
  getCities(){
    this.citiesLoading = true;
    this.cityService.findAll().subscribe(response =>{
      if(response.success){
        this.cities = response.data;
     //   this.toastrService.success(response.message,"Başarılı");
        this.citiesLoading = false;
      }else{
        this.toastrService.warning(response.message,"Başarısız");
        this.citiesLoading = false;
      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
      this.citiesLoading = false;
    }
    )
  }
  add(){
    this.carAddLoading = true;
    let carModel = Object.assign({},this.carAddForm.value);
    this.carService.add(carModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.carAddLoading = false;
          this.clearBrandAddForm();
          this.carAddForm.markAsUntouched();
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.carAddLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.carAddLoading = false;
      }
    )
   
  }
}
