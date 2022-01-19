import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { ColorListModel } from 'src/app/models/colorListModel';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  constructor(private colorService:ColorService) { }
  colors:ColorListModel[]=[];
  dataLoaded:boolean = false;
  ngOnInit(): void {
    this.getColors();
  }
  getColors(){ 
    this.colorService.getColors().subscribe(
      response=>{
        this.dataLoaded = false;
        this.colors = response.data;
        this.dataLoaded = true;
      }
    )
  }


}