import { ColorListModel } from './../models/colorListModel';
import { Observable } from 'rxjs';
import { CarListModel } from './../models/carListModel';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private baseUrl: string = environment.baseUrl;
   private  apiUrl: string = this.baseUrl + "colors/"
  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<ColorListModel>>{ 
    return this.httpClient.get<ListResponseModel<ColorListModel>>(this.apiUrl+"find-all")
  }
}
