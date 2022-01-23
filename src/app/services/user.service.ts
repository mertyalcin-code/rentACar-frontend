import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserListModel } from './../models/listModels/userListModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from './../models/responseModels/responseModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl;
  private  apiUrl: string = this.baseUrl + "users/"
 constructor(private httpClient: HttpClient) { }

 findAll(): Observable<ListResponseModel<UserListModel>>{ 
   return this.httpClient.get<ListResponseModel<UserListModel>>(this.apiUrl+"find-all")
 } 

 delete(id: number): Observable<ResponseModel> {
   return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
 }
}
