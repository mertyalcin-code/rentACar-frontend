import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { CorporateCustomerListModel } from './../models/listModels/corporateCustomerListModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorporateCustomerService {

  private baseUrl: string = environment.baseUrl;
   private  apiUrl: string = this.baseUrl + "corporate-customers/"
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ListResponseModel<CorporateCustomerListModel>>{ 
    return this.httpClient.get<ListResponseModel<CorporateCustomerListModel>>(this.apiUrl+"find-all")
  }
  findById(id:number): Observable<SingleResponseModel<CorporateCustomerListModel>>{ 
    return this.httpClient.get<SingleResponseModel<CorporateCustomerListModel>>(this.apiUrl+"find-by-id/"+id)
  }
}