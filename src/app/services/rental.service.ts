import { RentalListModel } from './../models/listModels/rentalListModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private baseUrl: string = environment.baseUrl;
  private  apiUrl: string = this.baseUrl + "rentals/"
 constructor(private httpClient: HttpClient) { }

 findAll(): Observable<ListResponseModel<RentalListModel>>{ 
   return this.httpClient.get<ListResponseModel<RentalListModel>>(this.apiUrl+"find-all")
 }
 findAllByCustomerId(customerId:number): Observable<ListResponseModel<RentalListModel>>{ 
  return this.httpClient.get<ListResponseModel<RentalListModel>>(this.apiUrl+"find-all-by-customer-id/"+customerId)
}

 findById(id:number): Observable<SingleResponseModel<RentalListModel>>{ 
   return this.httpClient.get<SingleResponseModel<RentalListModel>>(this.apiUrl+"find-by-id/"+id)
 }
}