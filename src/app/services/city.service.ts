import { CityListModel } from './../models/listModels/cityListModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseUrl: string = environment.baseUrl;
   private  apiUrl: string = this.baseUrl + "cities/"
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ListResponseModel<CityListModel>>{ 
    return this.httpClient.get<ListResponseModel<CityListModel>>(this.apiUrl+"find-all")
  }
  findById(id:number): Observable<SingleResponseModel<CityListModel>>{ 
    return this.httpClient.get<SingleResponseModel<CityListModel>>(this.apiUrl+"find-by-id/"+id)
  }

}