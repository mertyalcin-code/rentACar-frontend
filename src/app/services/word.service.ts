import { WordListModel } from './../models/listModels/wordListModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'words/';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ListResponseModel<WordListModel>> {
    return this.httpClient.get<ListResponseModel<WordListModel>>(
      this.apiUrl + 'find-all'
    );
  }
  findByKey(key: string): Observable<SingleResponseModel<WordListModel>> {
    return this.httpClient.get<SingleResponseModel<WordListModel>>(
      this.apiUrl + 'find-by-key/' + key
    );
  }
}
