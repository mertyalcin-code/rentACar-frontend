import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { CreateIndividualCustomerModel } from './../models/createModels/createIndividualCustomerModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { IndividualCustomerListModel } from './../models/listModels/individualCustomerListModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { UpdateIndividualCustomerModel } from '../models/updateModels/updateIndividualCustomerModel';

@Injectable({
  providedIn: 'root'
})
export class IndividualCustomerService {

  private baseUrl: string = environment.baseUrl;
   private  apiUrl: string = this.baseUrl + "individual-customers/"
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ListResponseModel<IndividualCustomerListModel>>{ 
    return this.httpClient.get<ListResponseModel<IndividualCustomerListModel>>(this.apiUrl+"find-all")
  }
  findById(id:number): Observable<SingleResponseModel<IndividualCustomerListModel>>{ 
    return this.httpClient.get<SingleResponseModel<IndividualCustomerListModel>>(this.apiUrl+"find-by-id/"+id)
  }
  add(model:CreateIndividualCustomerModel): Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",model)
  }
  update(model:UpdateIndividualCustomerModel): Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",model)
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }
}