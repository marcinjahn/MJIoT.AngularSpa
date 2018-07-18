import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { SuiModule } from 'ng2-semantic-ui';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { DevicesTableComponent } from './components/devices-table/devices-table.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { SingleConnectionComponent } from './components/single-connection/single-connection.component';
import { NewConnectionFormComponent } from './components/new-connection-form/new-connection-form.component';
import { ConnectionConfigsService } from './services/connection-configs.service';
import { PropertiesComponent } from './components/properties/properties.component';


const routes: Routes = [
  { path: '', redirectTo: 'devices', pathMatch: 'full' },
  { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
  { path: 'connections', component: ConnectionsComponent, canActivate: [AuthGuard] },
  { path: 'properties', component: PropertiesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'devices' }
 ];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DevicesComponent,
    BrandBarComponent,
    DevicesTableComponent,
    ConnectionsComponent,
    SingleConnectionComponent,
    NewConnectionFormComponent,
    PropertiesComponent
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
    ConnectionConfigsService,
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
