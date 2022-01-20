import { ResponseModel } from './../models/responseModels/responseModel';
import { CreateCarModel } from './../models/createModels/createCarModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { CarListModel } from './../models/listModels/carListModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';
import { Observable } from 'rxjs';

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

  findAll(): Observable<ListResponseModel<CarListModel>>{ 
    return this.httpClient.get<ListResponseModel<CarListModel>>(this.apiUrl+"find-all")
  }
  findById(carId:number): Observable<SingleResponseModel<CarListModel>>{ 
    return this.httpClient.get<SingleResponseModel<CarListModel>>(this.apiUrl+"find-by-id/"+carId)
  }
  add(car:CreateCarModel): Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",car)
  }

}
