import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { CarDamageListModel } from './../models/listModels/carDamageListModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { CreateCarDamageModel } from '../models/createModels/createCarDamageModel';

@Injectable({
  providedIn: 'root'
})
export class CarDamageService {

  private baseUrl: string = environment.baseUrl;
  private  apiUrl: string = this.baseUrl + "car-damages/"
 constructor(private httpClient: HttpClient) { }

 findAll(carId:number): Observable<ListResponseModel<CarDamageListModel>>{ 
   return this.httpClient.get<ListResponseModel<CarDamageListModel>>(this.apiUrl+"find-all-by-car-id"+carId)
 }
 findById(id:number): Observable<SingleResponseModel<CarDamageListModel>>{ 
   return this.httpClient.get<SingleResponseModel<CarDamageListModel>>(this.apiUrl+"find-by-id/"+id)
 }
 add(model:CreateCarDamageModel): Observable<ResponseModel>{ 
  return this.httpClient.post<ResponseModel>(this.apiUrl+"add",model)
}
}