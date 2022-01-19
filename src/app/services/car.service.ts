import { Observable } from 'rxjs';
import { CarListModel } from './../models/carListModel';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseUrl: string = environment.baseUrl;
   private  apiUrl: string = this.baseUrl + "cars/"
  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<CarListModel>>{ 
    return this.httpClient.get<ListResponseModel<CarListModel>>(this.apiUrl+"find-all")
  }
}
