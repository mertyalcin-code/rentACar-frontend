import { UpdateCustomerCardDetailModel } from './../models/updateModels/updateCustomerCardDetailModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { CustomerCardDetailListModel } from './../models/listModels/customerCardDetailListModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { Injectable } from '@angular/core';
import { CreateCustomerCardDetailModel } from '../models/createModels/createCustomerCardDetailModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerCardDetailService {

  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + "customer-card-details/"
  constructor(private httpClient: HttpClient) { }

  findAllByCustomerId(customerId: number): Observable<ListResponseModel<CustomerCardDetailListModel>> {
    return this.httpClient.get<ListResponseModel<CustomerCardDetailListModel>>(this.apiUrl + "find-by-customer-id/" + customerId)
  }
  findById(id: number): Observable<SingleResponseModel<CustomerCardDetailListModel>> {
    return this.httpClient.get<SingleResponseModel<CustomerCardDetailListModel>>(this.apiUrl + "find-by-id/" + id)
  }
  add(model: CreateCustomerCardDetailModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", model)
  }
  update(model: UpdateCustomerCardDetailModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "update", model)
  }

  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }

}