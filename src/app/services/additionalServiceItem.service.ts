import { CreateAdditionalServiceItemModel } from './../models/createModels/createAdditionalServiceItem';
import { UpdateAdditionalServiceItemModel } from './../models/updateModels/updateAdditionalServiceItemModel';

import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { AdditionalServiceItemListModel } from './../models/listModels/additionalServiceItemListModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServiceItemService {

  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + "additional-service-items/"
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ListResponseModel<AdditionalServiceItemListModel>> {
    return this.httpClient.get<ListResponseModel<AdditionalServiceItemListModel>>(this.apiUrl + "find-all")
  }
  findById(id: number): Observable<SingleResponseModel<AdditionalServiceItemListModel>> {
    return this.httpClient.get<SingleResponseModel<AdditionalServiceItemListModel>>(this.apiUrl + "find-by-id/" + id)
  }
  add(model: CreateAdditionalServiceItemModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", model)
  }
  update(model: UpdateAdditionalServiceItemModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "update", model)
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }

}
