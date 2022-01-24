import { UpdateBrandModel } from './../models/updateModels/updateBrandModel';
import { CreateBrandModel } from './../models/createModels/createBrandModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { BrandListModel } from './../models/listModels/brandListModel';

import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'brands/';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ListResponseModel<BrandListModel>> {
    return this.httpClient.get<ListResponseModel<BrandListModel>>(
      this.apiUrl + 'find-all'
    );
  }
  findById(id: number): Observable<SingleResponseModel<BrandListModel>> {
    return this.httpClient.get<SingleResponseModel<BrandListModel>>(
      this.apiUrl + 'find-by-id/' + id
    );
  }
  add(model: CreateBrandModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', model);
  }
  update(model: UpdateBrandModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', model);
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'delete/' + id);
  }
}
