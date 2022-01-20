import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SegmentService } from './../../../services/segment.service';
import { ColorService } from './../../../services/color.service';
import { CityService } from './../../../services/city.service';
import { BrandService } from './../../../services/brand.service';
import { CarService } from './../../../services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  loading = false;
  constructor(private carService:CarService,
    private brandService: BrandService,
    private cityService: CityService,
    private colorService: ColorService,
    private segmentService: SegmentService
    
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
  }
  brandAddForm = new FormGroup({
    carName: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    brandId: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    colorId: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    dailyPrice: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    findexScore: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    kilometer: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    imageUrl: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    description: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    minAge: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    segmentId: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    cityId: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
  })
  clearBrandAddForm() {
    this.brandAddForm.patchValue({
      carName: '',
      brandId: '',
      colorId: '',
      dailyPrice: '',
      findexScore: '',
 
   
    });
  }

}
