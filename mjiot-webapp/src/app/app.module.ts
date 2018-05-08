import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { SuiModule } from 'ng2-semantic-ui';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { LoginComponent } from './components/login/login.component';
import { DevicesComponent } from './components/devices/devices.component';
import { UserService } from './services/user.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationApiUrl, WebAPIUrl } from './injection-tokens';
import { BrandBarComponent } from './components/brand-bar/brand-bar.component';
import { DeviceInfoApiService } from './services/device-info-api.service';


const routes: Routes = [
  { path: '', redirectTo: 'devices', pathMatch: 'full' },
  { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: DevicesComponent }
 ];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DevicesComponent,
    BrandBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SuiModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [
    AuthGuard,
    UserService,
    AuthenticationService,
    DeviceInfoApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: AuthenticationApiUrl,
      useValue: "http://localhost:52805/api/token/"
    },
    {
      provide: WebAPIUrl,
      useValue: "http://localhost:53927/api/Devices/"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
