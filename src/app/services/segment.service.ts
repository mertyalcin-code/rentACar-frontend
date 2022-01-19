import { SegmentListModel } from './../models/listModels/segmentListModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {

  private baseUrl: string = environment.baseUrl;
   private  apiUrl: string = this.baseUrl + "segments/"
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ListResponseModel<SegmentListModel>>{ 
    return this.httpClient.get<ListResponseModel<SegmentListModel>>(this.apiUrl+"find-all")
  }
  findById(id:number): Observable<SingleResponseModel<SegmentListModel>>{ 
    return this.httpClient.get<SingleResponseModel<SegmentListModel>>(this.apiUrl+"find-by-id/"+id)
  }
}
