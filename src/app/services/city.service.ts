import { UpdateCityModel } from './../models/updateModels/updateCityModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { CityListModel } from './../models/listModels/cityListModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { CreateCityModel } from '../models/createModels/createCityModel';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'cities/';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ListResponseModel<CityListModel>> {
    return this.httpClient.get<ListResponseModel<CityListModel>>(
      this.apiUrl + 'find-all'
    );
  }
  findById(id: number): Observable<SingleResponseModel<CityListModel>> {
    return this.httpClient.get<SingleResponseModel<CityListModel>>(
      this.apiUrl + 'find-by-id/' + id
    );
  }
  add(model: CreateCityModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', model);
  }
  update(model: UpdateCityModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', model);
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'delete/' + id);
  }
}
