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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //varaibles
  loading =false;
  //constructor
  constructor(
   private authService : AuthService,
   private toastrService: ToastrService,
   private localService: LocalService,
   private router:Router

  ) { }
    //starter
  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl('/home');
    }
    
  }
  //login form
  loginForm = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,]), 
  })
  //clear login form 
  clearLoginForm() {
    this.loginForm.patchValue({
      email: '',
      password: '',      
    });
  }
  //sends login request
  login(){
    this.loading=true;
    let form:LoginModel ={email:this.loginForm.get('email').value , password:this.loginForm.get('password').value }
    this.authService.login(form).subscribe((response: SingleResponseModel<LoginResponseModel>) => {
      if (response.success) {   
        this.localService.setJsonValue('user',response.data);
        this.toastrService.success(response.message,"Başarılı");
        this.router.navigateByUrl('/#');
        this.loading=false;
        window.location.reload();
      } else {     
        this.loading=false;
        this.clearLoginForm();
        this.toastrService.warning(response.message,"Başarısız");
      }
    },
    (errorResponse: HttpErrorResponse) => {  
      this.loading=false;     
      this.toastrService.error(errorResponse.message,"Başarısız");

    }


    )
  }
}
