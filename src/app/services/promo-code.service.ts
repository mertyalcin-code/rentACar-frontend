import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { PromoCodeListModel } from './../models/listModels/promoCodeListModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { CreatePromoCodeModel } from '../models/createModels/createPromoCodeModel';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'promo-codes/';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ListResponseModel<PromoCodeListModel>> {
    return this.httpClient.get<ListResponseModel<PromoCodeListModel>>(
      this.apiUrl + 'find-all'
    );
  }

  findByCode(
    code: string
  ): Observable<SingleResponseModel<PromoCodeListModel>> {
    return this.httpClient.get<SingleResponseModel<PromoCodeListModel>>(
      this.apiUrl + 'find-by-code/' + code
    );
  }
  findById(id: number): Observable<SingleResponseModel<PromoCodeListModel>> {
    return this.httpClient.get<SingleResponseModel<PromoCodeListModel>>(
      this.apiUrl + 'find-by-id/' + id
    );
  }
  add(model: CreatePromoCodeModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', model);
  }
  update(model: PromoCodeListModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', model);
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'delete/' + id);
  }
}
