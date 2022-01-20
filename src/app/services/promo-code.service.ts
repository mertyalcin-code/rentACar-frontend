import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { PromoCodeListModel } from './../models/listModels/promoCodeListModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {

  private baseUrl: string = environment.baseUrl;
   private  apiUrl: string = this.baseUrl + "promo-codes/"
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ListResponseModel<PromoCodeListModel>>{ 
    return this.httpClient.get<ListResponseModel<PromoCodeListModel>>(this.apiUrl+"find-all")
  }
 
  findByCode(code:string): Observable<SingleResponseModel<PromoCodeListModel>>{ 
    return this.httpClient.get<SingleResponseModel<PromoCodeListModel>>(this.apiUrl+"find-by-code/"+code)
  }
}