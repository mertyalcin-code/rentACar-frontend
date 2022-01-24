import { CreateAdditionalServiceModel } from './../models/createModels/createAdditionalServiceModel';
import { Observable } from 'rxjs';
import { AdditionalServiceListModel } from './../models/listModels/additionalServiceListModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdditionalServiceService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'additional-services/';
  constructor(private httpClient: HttpClient) {}

  findAllByRentalId(
    rentalId
  ): Observable<ListResponseModel<AdditionalServiceListModel>> {
    return this.httpClient.get<ListResponseModel<AdditionalServiceListModel>>(
      this.apiUrl + 'find-all-by-rental-id/' + rentalId
    );
  }
  addAll(
    services: CreateAdditionalServiceModel[]
  ): Observable<ListResponseModel<AdditionalServiceListModel>> {
    return this.httpClient.post<ListResponseModel<AdditionalServiceListModel>>(
      this.apiUrl + 'add-all/',
      services
    );
  }
}
