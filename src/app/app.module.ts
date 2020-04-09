import { RoleAuthGuard } from './role-auth-guard.service';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { AdminBidService } from './admin-bid.service';
import { BidService } from './bid.service';
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

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { AdminComponent } from './admin/admin.component';
import { TraderComponent } from './trader/trader.component';
import { HttpClientModule,HTTP_INTERCEPTORS  } from "@angular/common/http";
import { LoaderComponent } from './loader/loader.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


const routes=[
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
   {path:"admin",component:AdminComponent, "canActivate":[AuthGuard,RoleAuthGuard]},
   {path:"trader",component:TraderComponent, "canActivate":[AuthGuard,RoleAuthGuard]}
]

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
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
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [BidService,AdminBidService,
    AuthGuard,RoleAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
