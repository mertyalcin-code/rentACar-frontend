import { RentalAddResponseModel } from './../models/responseModels/rentalAddResponseModel';
import { MyRentalListModel } from './../models/listModels/myRentalListModel';
import { ResponseModel } from './../models/responseModels/responseModel';
import { CreateRentalModel } from './../models/createModels/createRentalModel';
import { RentalListModel } from './../models/listModels/rentalListModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private baseUrl: string = environment.baseUrl;
  private  apiUrl: string = this.baseUrl + "rentals/"
 constructor(private httpClient: HttpClient) { }

 findAll(): Observable<ListResponseModel<RentalListModel>>{ 
   return this.httpClient.get<ListResponseModel<RentalListModel>>(this.apiUrl+"find-all")
 }
 findAllByCustomerId(customerId:number): Observable<ListResponseModel<MyRentalListModel>>{ 
  return this.httpClient.get<ListResponseModel<MyRentalListModel>>(this.apiUrl+"find-all-by-customer-id/"+customerId)
}

 findById(id:number): Observable<SingleResponseModel<RentalListModel>>{ 
   return this.httpClient.get<SingleResponseModel<RentalListModel>>(this.apiUrl+"find-by-id/"+id)
 }
 
 findActiveRentalByCarId(id:number): Observable<SingleResponseModel<RentalListModel>>{ 
  return this.httpClient.get<SingleResponseModel<RentalListModel>>(this.apiUrl+"find-active-rental-by-car-id/"+id)
}
 addForIndividualCustomer(rental:CreateRentalModel): Observable<SingleResponseModel<RentalAddResponseModel>>{ 
  return this.httpClient.post<SingleResponseModel<RentalAddResponseModel>>(this.apiUrl+"add-for-individual-customer",rental)
}
addForCorporateCustomer(rental:CreateRentalModel): Observable<SingleResponseModel<RentalAddResponseModel>>{ 
  return this.httpClient.post<SingleResponseModel<RentalAddResponseModel>>(this.apiUrl+"add-for-corporate-customer",rental)
}
}