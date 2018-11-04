import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { User } from "../../services/auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  users: User[];
  user: User;

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
    private router: Router
  ) {
    this.createForm();
   }

  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(35)
      ])],
       confirm: ['', Validators.required]
    } , {validator: this.matchingPasswords('password', 'confirm')})
  }


  matchingPasswords(password, confirm){
    return(group: FormGroup)=>{
      if(group.controls[password].value === group.controls[confirm].value){
        return null;
      }else{
        return{ 'matchingPasswords': true}
      }
    }
  }
  onRegisterSubmit(){
    this.processing = true;
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }
    

    this.authService.registerUser(user).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger'
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success'
        this.message = data.message;
        setTimeout(()=>{
          this.router.navigate(['/login'])
        }, 2000)
      }
    });
     
  }
  
  checkEmail(){
    this.authService.checkEmail(this.form.get('email').value).subscribe(data=>{
      if(!data.success){
        this.emailValid = false;
        this.emailMessage  = data.message;
      }else{
        this.emailValid = true;
        this.emailMessage = data.message
      }
    });
  }

  checkUsername(){
    this.authService.checkUsername(this.form.get('username').value).subscribe(data=>{
      if(!data.success){
        this.userValid = false;
        this.userMessage  = data.message;
      }else{
        this.userValid = true;
        this.userMessage = data.message
      }
    });}

  ngOnInit() {
  }

}
