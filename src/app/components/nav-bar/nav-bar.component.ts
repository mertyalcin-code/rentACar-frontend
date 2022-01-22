import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService,
      private router:Router,private toastrService : ToastrService
    ) { }
  isAuth=false;
  isEmployee=false;
  ngOnInit() {
    this.isAuth= this.authService.isAuthenticated();
    this.isEmployee=this.authService.isEmployee();
  }
  onLogout(){
    this.authService.logout();
    this.toastrService.info("Çıkış Yapıldı")
    this.router.navigateByUrl('/#');
    window.location.reload();
  }
}
