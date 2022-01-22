import { UpdateCarModel } from './../../../models/updateModels/updateCarModel';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { CarListModel } from './../../../models/listModels/carListModel';
import { BrandListModel } from './../../../models/listModels/brandListModel';
import { ColorListModel } from 'src/app/models/listModels/colorListModel';
import { CityListModel } from 'src/app/models/listModels/cityListModel';
import { CarService } from './../../../services/car.service';
import { BrandService } from './../../../services/brand.service';
import { CityService } from './../../../services/city.service';
import { ColorService } from './../../../services/color.service';
import { SegmentService } from './../../../services/segment.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UpdateColorModel } from './../../../models/updateModels/updateColorModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { Component, OnInit } from '@angular/core';
import { SegmentListModel } from 'src/app/models/listModels/segmentListModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  colorsLoading = false;
  brandsLoading = false;
  segmentsLoading = false;
  citiesLoading = false;
  carUpdateLoading = false;
  brands :BrandListModel[]=[]
  colors :ColorListModel[]=[]
  segments :SegmentListModel[]=[]
  cities :CityListModel[]=[]
  editCar:CarListModel;
  constructor(
    private carService:CarService,
    private brandService: BrandService,
    private cityService: CityService,
    private colorService: ColorService,
    private segmentService: SegmentService,
    private toastrService: ToastrService ,
    private router: ActivatedRoute
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
    this.findById(parseInt(this.router.snapshot.paramMap.get('id'))) ;  
    this.getBrands();
    this.getColors();
    this.getCities();
    this.getSegments();
  }
  carUpdateForm = new FormGroup({
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
  clearCarUpdateForm() {
    this.carUpdateForm.patchValue({
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
  findById(id:number){
    this.carService.findById(id).subscribe(
      (response: SingleResponseModel<CarListModel>) => {
        if (response.success) {   
          this.editCar=response.data;
          this.carUpdateForm.patchValue({
            model:response.data.model,   
            carName: response.data.carName,
            brandId: response.data.brandId,
            colorId:response.data.colorId,
            dailyPrice: response.data.dailyPrice,
            findexScore: response.data.findexScore,
            kilometer: response.data.kilometer,
            imageUrl: response.data.imageUrl,
            description: response.data.description,
            minAge: response.data.minAge,
            segmentId: response.data.segmentId,
            cityId: response.data.cityId,
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
    this.carUpdateLoading = true;
    let carModel:UpdateCarModel = Object.assign({},this.carUpdateForm.value);
    carModel.id=this.editCar.id
    this.carService.update(carModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.carUpdateLoading = false;
          this.clearCarUpdateForm();
          this.carUpdateForm.markAsUntouched();
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.carUpdateLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.carUpdateLoading = false;
      }
    )
   
  }
}
