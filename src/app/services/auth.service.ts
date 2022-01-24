import { LoginResponseModel } from './../models/responseModels/loginResponseModel';
import { SingleResponseModel } from './../models/responseModels/singleResponseModel';
import { LocalService } from './local.service';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './../models/loginModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.baseUrl + 'auth/';
  constructor(
    private httpClient: HttpClient,
    private localService: LocalService
  ) {}

  login(loginModel: LoginModel) {
    console.log(environment.baseUrl + 'auth/' + 'login');
    return this.httpClient.post<SingleResponseModel<LoginResponseModel>>(
      this.apiUrl + 'login',
      loginModel
    );
  }
  getUserFromLocalStorage(): LoginResponseModel {
    if (this.localService.getJsonValue('user')) {
      return this.localService.getJsonValue('user');
    } else {
      return null;
    }
  }
  isAuthenticated() {
    if (this.localService.getJsonValue('user')) {
      return true;
    } else {
      return false;
    }
  }
  isEmployee(): boolean {
    let user: LoginResponseModel = this.localService.getJsonValue('user');
    if (user !== null && user.role == 'EMPLOYEE') {
      return true;
    } else {
      return false;
    }
  }
  isIndividualCustomer(): boolean {
    let user: LoginResponseModel = this.localService.getJsonValue('user');
    console.log(user);
    if (user !== null && user.role == 'INDIVIDUAL_CUSTOMER') {
      return true;
    } else {
      return false;
    }
  }
  isCorporateCustomer(): boolean {
    let user: LoginResponseModel = this.localService.getJsonValue('user');
    if (user !== null && user.role == 'CORPORATE_CUSTOMER') {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    this.localService.clearToken();
  }
}
