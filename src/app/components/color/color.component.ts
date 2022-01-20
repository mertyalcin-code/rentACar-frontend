import { ColorListModel } from 'src/app/models/listModels/colorListModel';
import { ColorService } from './../../services/color.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
    this.colorService.findAll().subscribe(
      response=>{
        this.dataLoaded = false;
        this.colors = response.data;
        this.dataLoaded = true;
      }
    )
  }
 

}