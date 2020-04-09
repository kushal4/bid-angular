import { AuthService } from './auth.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router) {}

  canActivate(route, state:RouterStateSnapshot) {
     //console.log("hitting here");
     let decoded_token=this.auth.decodeToken();
     let curr_url=state.url;
     if(curr_url==`/${decoded_token["role"].toLowerCase()}`){
       return true;
     }else{
       this.router.navigate([`/${decoded_token["role"].toLowerCase()}`]);
       return false;
     }
    //return this.auth.appUser$
      //.map(appUser => appUser.isAdmin);
  }

}
