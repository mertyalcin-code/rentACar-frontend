import { ResponseModel } from './../../models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ListResponseModel } from './../../models/responseModels/listResponseModel';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { UserListModel } from './../../models/listModels/userListModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  //variables
  users:UserListModel[]=[];
  usersLoading:boolean = false;
  deleteLoading=false;
  searchTerm:string='';
  //constructor
  constructor(private userService:UserService,
    private toastrService: ToastrService
    
    ) { }
 //starter
  ngOnInit(): void {
    this.findAll();
  }
  //finds all users
  findAll(){
    this.usersLoading = true;   
    this.userService.findAll().subscribe(
      (response: ListResponseModel<UserListModel>) => {
        if (response.success) {           
          this.usersLoading = false;
          this.users=response.data;
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.usersLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.usersLoading = false;
      }
    )
  }
  //deletes user if there is no relation in the database
  delete(id:number){
    this.deleteLoading = true;   
    this.userService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.deleteLoading = false;
          this.findAll();
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.deleteLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.deleteLoading = false;
      }
    )
  }

}
