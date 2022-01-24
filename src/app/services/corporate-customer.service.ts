import { UpdateCorporateCustomerModel } from './../models/updateModels/updateCorporateCustomerModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { CreateCorporateCustomerModel } from './../models/createModels/createCorporateCustomerModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { CorporateCustomerListModel } from './../models/listModels/corporateCustomerListModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CorporateCustomerService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'corporate-customers/';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ListResponseModel<CorporateCustomerListModel>> {
    return this.httpClient.get<ListResponseModel<CorporateCustomerListModel>>(
      this.apiUrl + 'find-all'
    );
  }
  findById(
    id: number
  ): Observable<SingleResponseModel<CorporateCustomerListModel>> {
    return this.httpClient.get<SingleResponseModel<CorporateCustomerListModel>>(
      this.apiUrl + 'find-by-id/' + id
    );
  }
  add(model: CreateCorporateCustomerModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', model);
  }
  update(model: UpdateCorporateCustomerModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', model);
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'delete/' + id);
  }
}
