import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { CustomerCardDetailListModel } from './../models/listModels/customerCardDetailListModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerCardDetailService {

  private baseUrl: string = environment.baseUrl;
  private  apiUrl: string = this.baseUrl + "customer-car-details/"
 constructor(private httpClient: HttpClient) { }

 findAllByCustomerId(customerId:number): Observable<ListResponseModel<CustomerCardDetailListModel>>{ 
   return this.httpClient.get<ListResponseModel<CustomerCardDetailListModel>>(this.apiUrl+"find-by-customer-id/"+customerId)
 }
 findById(id:number): Observable<SingleResponseModel<CustomerCardDetailListModel>>{ 
   return this.httpClient.get<SingleResponseModel<CustomerCardDetailListModel>>(this.apiUrl+"find-by-id/"+id)
 }
}