import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


 // readonly  BASE_URL="localhost:3003/api";
 login_url="http://localhost:3003/api/users/login";
  constructor(private http:HttpClient) { }

  login(auth_params){
    return new Promise((resolve,reject)=>{
      const LOGIN_URI="/users/login";
     // let login_url=this.BASE_URL+ LOGIN_URI;
      this.http.post(this.login_url,auth_params).subscribe(auth_response=>{
          resolve(auth_response);
      });
    });

  }

  getAccessToken(){
    return localStorage.getItem("access_token");
  }

  decodeToken(token=null){
    if(!token){
      token=this.getAccessToken();
    }
    let decode_token=jwt_decode(token);
    return decode_token;
  }

  setToken(token){
    localStorage.setItem("access_token", token);
  }

  logout(){
    localStorage.removeItem("access_token");
  }
}
