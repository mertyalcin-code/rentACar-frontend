import { BrandListModel } from './../../models/brandListModel';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({ // buraya decorator denir. 
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private brandService:BrandService) { }
  brands:BrandListModel[]=[];
  dataLoaded:boolean = false;
  ngOnInit(): void {
    this.getBrands();
  }
  getBrands(){ 
    this.brandService.getBrands().subscribe(
      response=>{
        this.dataLoaded = false;
        this.brands = response.data;
        this.dataLoaded = true;
      }
    )
  }


}
