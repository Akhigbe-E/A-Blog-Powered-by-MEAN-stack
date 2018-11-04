import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
//import { FlashMessage } from "angular2-flash-messages";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  

  ngOnInit() {
  }
  tet;

  check(){
    this.tet = this.authService.checkLogin();
    if(this.tet===null){
      return true;
    }else{
      return false;
    }
  }
}
