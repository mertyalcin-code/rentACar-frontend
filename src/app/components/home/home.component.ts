import { SegmentService } from './../../services/segment.service';
import { CityService } from './../../services/city.service';
import { BrandListModel } from './../../models/listModels/brandListModel';
import { BrandService } from './../../services/brand.service';
import { ColorListModel } from 'src/app/models/listModels/colorListModel';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { CityListModel } from 'src/app/models/listModels/cityListModel';
import { SegmentListModel } from 'src/app/models/listModels/segmentListModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //variables
  colors: ColorListModel[] = [];
  brands: BrandListModel[] = [];
  segments: SegmentListModel[] = [];
  cities: CityListModel[] = [];
  selectedColor: ColorListModel;
  selectedBrand: BrandListModel;
  selectedCity: CityListModel;
  selectedSegment: SegmentListModel;
  constructor(
    private colorService: ColorService,
    private brandService: BrandService,
    private cityService: CityService,
    private segmentService: SegmentService
  ) {}

  //starter
  ngOnInit() {
    this.getColors();
    this.getBrands();
    this.getCities();
    this.getSegments();
  }
  //gets all colors
  getColors() {
    this.colorService.findAll().subscribe((response) => {
      this.colors = response.data;
    });
  }
  //gets all brands
  getBrands() {
    this.brandService.findAll().subscribe((response) => {
      this.brands = response.data;
    });
  }
  //get all cities
  getCities() {
    this.cityService.findAll().subscribe((response) => {
      this.cities = response.data;
    });
  }
  //get all segments
  getSegments() {
    this.segmentService.findAll().subscribe((response) => {
      this.segments = response.data;
    });
  }
  //resets the filter
  resetFilter() {
    this.selectedBrand = null;
    this.selectedColor = null;
    this.selectedCity = null;
    this.selectedSegment = null;
  }
}
