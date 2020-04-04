import { User } from './../model/User';
import { AuthService } from './../auth.service';
import { Component,EventEmitter,Output, Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {


  user_obj:User={
    username:null,
    isAdmin:false
  };
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit() {
      let decoded_token=this.authService.decodeToken();
      if(decoded_token){
          this.user_obj["username"]=decoded_token["username"];
          this.user_obj["isAdmin"]=decoded_token["role"]=="Admin"?true:false;
      }
  }

  logout(){

    this.authService.logout();
    this.router.navigate(['/login']);

  }



}
