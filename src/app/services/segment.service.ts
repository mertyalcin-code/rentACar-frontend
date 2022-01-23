import { UpdateSegmentModel } from './../models/updateModels/updateSegmentModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { CreateSegmentModel } from './../models/createModels/createSegmentModel';
import { SegmentListModel } from './../models/listModels/segmentListModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
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
  add(model:CreateSegmentModel): Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",model)
  }
  update(model:UpdateSegmentModel): Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",model)
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }
}
