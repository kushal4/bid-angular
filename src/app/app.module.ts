import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AuthGuard } from './auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { AdminComponent } from './admin/admin.component';
import { TraderComponent } from './trader/trader.component';
import { HttpClientModule } from "@angular/common/http";
import { LoaderComponent } from './loader/loader.component';


const routes=[
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
   {path:"admin",component:AdminComponent, "canActivate":[AuthGuard]},
   {path:"trader",component:TraderComponent, "canActivate":[AuthGuard]}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    AdminComponent,
    TraderComponent,
    BsNavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
