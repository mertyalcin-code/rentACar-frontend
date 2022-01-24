import { UpdateColorModel } from './../models/updateModels/updateColorModel';
import { ResponseModel } from './../models/responseModels/responseModel';
import { CreateColorModel } from './../models/createModels/createColorModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { ColorListModel } from 'src/app/models/listModels/colorListModel';

import { ListResponseModel } from './../models/responseModels/listResponseModel';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'colors/';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ListResponseModel<ColorListModel>> {
    return this.httpClient.get<ListResponseModel<ColorListModel>>(
      this.apiUrl + 'find-all'
    );
  }
  findById(id: number): Observable<SingleResponseModel<ColorListModel>> {
    return this.httpClient.get<SingleResponseModel<ColorListModel>>(
      this.apiUrl + 'find-by-id/' + id
    );
  }
  add(color: CreateColorModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', color);
  }
  update(model: UpdateColorModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', model);
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'delete/' + id);
  }
}
