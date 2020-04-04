import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

signIn={
    "username":null,
    "password":null
  };
  errorMsg={
    "username":null,
    "password":null
  };
  show=false;
  constructor(private router:Router,
    private authService:AuthService,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  Login(loginObj){
    //let returnUrl=this.route.snapshot.paramMap.get('returnUrl') || '/movie-home';
    let loginP=this.authService.login(loginObj);
    this.show=true;
    let admin_url="/admin";
    let trader_url="/trader";
    let returnUrl="";
    loginP.then(auth_response=>{
      this.errorMsg={ "username":null,
      "password":null};
      this.show=false;
      try {
        let code = auth_response["code"];
        //console.log(code);
        if (code == 200) {
          if (auth_response.hasOwnProperty("access_token")) {
            let token=auth_response["access_token"];
            let decode_token=this.authService.decodeToken(token);
            console.log(decode_token);
            this.authService.setToken(token);
            let role=decode_token["role"];
            if(role=="Admin"){
              returnUrl=admin_url;
            }else{
              returnUrl=trader_url;
            }

           this.router.navigate([returnUrl]);
          }
        }else{
          if(auth_response.hasOwnProperty("errors")){
            //console.log(auth_response["errors"]);
              this.errorMsg=auth_response["errors"];
              console.log(this.errorMsg);
          }
        }

      } catch (exception) {
        console.log(exception);
      }
    })
  }

}
