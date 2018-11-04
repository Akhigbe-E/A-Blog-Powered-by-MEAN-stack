import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { User, UserLogin } from "./auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  domain = "http://localhost:8080";
  authToken;
  user;
  options;

  constructor(
    private http: HttpClient
  ) { }



  loadToken(){
    this.authToken = localStorage.getItem('token')
  }
  //Function to register User
  registerUser(user: User): Observable<User>{
      return this.http.post<User>(this.domain+'/authenticate/register', user, {headers: new HttpHeaders({'Content-Type':'application/json'})
    });
  };

  checkUsername(username){
    return this.http.get<User>(this.domain+'/authenticate/checkUsername/'+username, {headers: new HttpHeaders({'Content-Type':'application/json'})
  });}

  checkEmail(email){
    return this.http.get(this.domain+'/authenticate/checkEmail/'+ email, {headers: new HttpHeaders({'Content-Type':'application/json'})
  });
  }
  login(user: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(this.domain+'/authenticate/login', user, {headers: new HttpHeaders({'Content-Type':'application/json'})
  });
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  thet;

  checkLogin(){
    this.thet = localStorage.getItem('token');
    return this.thet;
  }

  storeUserData(token, user){
    localStorage.setItem("token", token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile(){
    this.loadToken();
    return this.http.get(this.domain+'/authenticate/profile', {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.authToken
    })})
  }
}
