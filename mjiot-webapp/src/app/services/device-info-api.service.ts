import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WebAPIUrl } from './../injection-tokens';
import { ListenerDataDto } from '../models/dtos/listener-data-dto';
import { SetListenersDto } from '../models/dtos/set-listeners-dto';

@Injectable()
export class DeviceInfoApiService {

  constructor(private http: HttpClient, @Inject(WebAPIUrl) private webApiUrl) { }

  getDevices() {
    return this.http.get<any>(this.webApiUrl + "GetDevices")
      .toPromise();
  }

  getDevicesWithListeners() {
    return this.http.get<any>(this.webApiUrl + "GetDevicesWithListeners")
      .toPromise();
  }

  getProperties(deviceId: number) {
    let params = new HttpParams().set('deviceId', deviceId.toString());
    return this.http.get<any>(this.webApiUrl + "GetProperties", { params: params })
      .toPromise();
  }

  getDeviceListeners(deviceId: number) {
    let params = new HttpParams().set('deviceId', deviceId.toString());
    return this.http.get<any>(this.webApiUrl + "GetDeviceListeners", { params: params })
      .toPromise();
  }

  getPropertyListeners(deviceId: number, propertyName: string) {
    let params = new HttpParams();
    params = params.append('deviceId',deviceId.toString());
    params = params.append('propertyName', propertyName);

    return this.http.get<any>(this.webApiUrl + "GetDeviceListeners", { params: params })
      .toPromise();
  }

  setListeners(senderDeviceId: number, senderPropertyId: number, listeners: ListenerDataDto[]) {
    return this.manageListeners("SetListeners", senderDeviceId, senderPropertyId, listeners);
  }

  addListeners(senderDeviceId: number, senderPropertyId: number, listeners: ListenerDataDto[]) {
    return this.manageListeners("AddListeners", senderDeviceId, senderPropertyId, listeners);
  }

  removeListeners(senderDeviceId: number, senderPropertyId: number, listeners: ListenerDataDto[]) {
    return this.manageListeners("RemoveListeners", senderDeviceId, senderPropertyId, listeners);
  }

  private manageListeners(method: string, senderDeviceId: number, senderPropertyId: number, listeners: ListenerDataDto[]) {
    let postBody = new SetListenersDto(senderDeviceId, senderPropertyId, listeners);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post<any>(this.webApiUrl + method, postBody, { headers: headers })
      .toPromise();
  }

}
