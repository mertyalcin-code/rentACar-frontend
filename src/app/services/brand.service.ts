import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { BrandListModel } from './../models/listModels/brandListModel';

import { environment } from './../../environments/environment';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl: string = environment.baseUrl;
   private  apiUrl: string = this.baseUrl + "brands/"
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ListResponseModel<BrandListModel>>{ 
    return this.httpClient.get<ListResponseModel<BrandListModel>>(this.apiUrl+"find-all")
  }
  findById(id:number): Observable<SingleResponseModel<BrandListModel>>{ 
    return this.httpClient.get<SingleResponseModel<BrandListModel>>(this.apiUrl+"find-by-id/"+id)
  }
}
