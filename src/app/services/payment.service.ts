import { UpdatePaymentModel } from './../models/updateModels/updatePaymentModel';
import { TotalPriceRequestModel as TotalPriceRequestModel } from './../models/createModels/totalPriceRequestModel';
import { ResponseModel } from './../models/responseModels/responseModel';
import { CreatePaymentModel } from '../models/createModels/createPaymentModel';
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
  add(payment:CreatePaymentModel): Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",payment)
  }
  update(model:UpdatePaymentModel): Observable<ResponseModel>{ 
    return this.httpClient.put<ResponseModel>(this.apiUrl+"update",model)
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }
  calculateTotalPrice(totalPriceRequestModel: TotalPriceRequestModel): Observable<SingleResponseModel<number>>{ 
    return this.httpClient.post<SingleResponseModel<number>>(this.apiUrl+"find-total-price/",totalPriceRequestModel)
  }


}
