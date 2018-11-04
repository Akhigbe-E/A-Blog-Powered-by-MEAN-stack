import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  processing;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.form = this.formBuilder.group({
      username:['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit(){
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    
    this.authService.login(user).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.token, data.user);
          setTimeout(()=>{
            this.router.navigate(['/dashboard'])
          }, 2000)
        }
    })
  }
}
