import { InvoiceIndividualCustomerListModel } from 'src/app/models/listModels/invoiceIndividualCustomerListModel';
import { UpdateIndividualCustomerModel } from './../models/updateModels/updateIndividualCustomerModel';
import { CreateInvoiceModel } from './../models/createModels/createInvoiceModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { InvoiceCorporateCustomerListModel } from './../models/listModels/invoiceCorporateCustomerListModel';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { CreateCarDamageModel } from '../models/createModels/createCarDamageModel';
import { InvoiceListModel } from '../models/listModels/invoiceListModel';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'invoices/';
  constructor(private httpClient: HttpClient) {}
  findAll(): Observable<ListResponseModel<InvoiceListModel>> {
    return this.httpClient.get<ListResponseModel<InvoiceListModel>>(
      this.apiUrl + 'find-all'
    );
  }
  findByRentalIdForIndividualCustomer(
    id: number
  ): Observable<SingleResponseModel<InvoiceIndividualCustomerListModel>> {
    return this.httpClient.get<
      SingleResponseModel<InvoiceIndividualCustomerListModel>
    >(this.apiUrl + 'find-invoice-for-individual-customer/' + id);
  }
  findByRentalIdForCorporateCustomer(
    id: number
  ): Observable<SingleResponseModel<InvoiceCorporateCustomerListModel>> {
    return this.httpClient.get<
      SingleResponseModel<InvoiceCorporateCustomerListModel>
    >(this.apiUrl + 'find-invoice-for-corporate-customer/' + id);
  }
  add(model: CreateInvoiceModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', model);
  }

  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'delete/' + id);
  }
}
