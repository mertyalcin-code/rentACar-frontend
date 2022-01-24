import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { TranslationListModel } from './../models/listModels/translationListModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'translations/';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ListResponseModel<TranslationListModel>> {
    return this.httpClient.get<ListResponseModel<TranslationListModel>>(
      this.apiUrl + 'find-all'
    );
  }
  findById(id: number): Observable<SingleResponseModel<TranslationListModel>> {
    return this.httpClient.get<SingleResponseModel<TranslationListModel>>(
      this.apiUrl + 'find-by-id/' + id
    );
  }
}
