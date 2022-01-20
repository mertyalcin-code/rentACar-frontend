import { BrandListModel } from './../../models/listModels/brandListModel';

import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({ // buraya decorator denir. 
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  title = 'Brand List';
  brands:BrandListModel[] = [];
  dataLoaded: boolean = false;
  currentBrand: BrandListModel;
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrand()
  }

  getBrand(){
    this.brandService.findAll().subscribe(response =>{
      this.dataLoaded = false;
      this.brands = response.data;
      this.dataLoaded = true;
    })
  }

  

}