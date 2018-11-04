import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = 'LOLO';
  email="LOLO@lolo.com";
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data =>{
        this.username = data.user.username;
        this.email = data.user.email;
    });
  }

}
