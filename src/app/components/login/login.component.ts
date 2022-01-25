import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../models/responseModels/singleResponseModel';
import { LoginModel } from './../../models/loginModel';
import { LoginResponseModel } from './../../models/responseModels/loginResponseModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalService } from './../../services/local.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //varaibles
  loading = false;
  //constructor
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private localService: LocalService,
    private router: Router
  ) {}
  //starter
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }
    console.log(this.localService.getJsonValue('selectedCar'))

  }
  //login form
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  //clear login form
  clearLoginForm() {
    this.loginForm.patchValue({
      email: '',
      password: '',
    });
  }
  //sends login request
  login() {
    this.loading = true;
    let form: LoginModel = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    this.authService.login(form).subscribe(
      (response: SingleResponseModel<LoginResponseModel>) => {
        if (response.success) {
          this.localService.setJsonValue('user', response.data);
          this.toastrService.success(response.message, 'Başarılı');
          if (this.localService.getJsonValue('selectedCar') != null) {
            this.sendCustomerToRentCar();
          } 
          else {
            this.router.navigateByUrl('/home');
            window.location.reload();
          }
          this.loading = false;
     
        } else {
          this.loading = false;
          this.clearLoginForm();
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.loading = false;
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }
  sendCustomerToRentCar() {
    let id: number = this.localService.getJsonValue('selectedCar');
    if (this.authService.isCorporateCustomer()) {
      this.localService.setJsonValue('selectedCar', null);
      this.router.navigateByUrl('/rental/add/corporate-customer/' + id);
      timer(100).subscribe(x => {  window.location.reload(); })

    } else if (this.authService.isIndividualCustomer()) {
      this.localService.setJsonValue('selectedCar', null);
      this.router.navigateByUrl('/rental/add/individual-customer/' + id);
      timer(100).subscribe(x => {  window.location.reload(); })
     
    }
  }
}
