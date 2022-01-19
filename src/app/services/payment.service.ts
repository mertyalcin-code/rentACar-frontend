import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaymentListModel } from '../models/listModels/paymentListModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl: string = environment.baseUrl;
   private  apiUrl: string = this.baseUrl + "payments/"
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ListResponseModel<PaymentListModel>>{ 
    return this.httpClient.get<ListResponseModel<PaymentListModel>>(this.apiUrl+"find-all")
  }
  findAllByRentalId(rentalId:number): Observable<ListResponseModel<PaymentListModel>>{ 
    return this.httpClient.get<ListResponseModel<PaymentListModel>>(this.apiUrl+"find-all-by-rental-id/"+rentalId)
  }
  findById(id:number): Observable<SingleResponseModel<PaymentListModel>>{ 
    return this.httpClient.get<SingleResponseModel<PaymentListModel>>(this.apiUrl+"find-by-id/"+id)
  }
}
