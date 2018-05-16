import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WebAPIUrl } from './../injection-tokens';
import { ListenerDataDto } from '../models/dtos/listener-data-dto';
import { SetListenersDto } from '../models/dtos/set-listeners-dto';
import { DeviceInfoDto } from '../models/dtos/device-info-dto';
import { ListenersWithSenderPropertyDto } from '../models/dtos/listeners-with-sender-property-dto';

@Injectable()
export class DeviceInfoApiService {
  constructor(private http: HttpClient, @Inject(WebAPIUrl) private webApiUrl) { }

  getDevices(includeConnections: boolean, includeAvailability: boolean, includeProperties: boolean): Promise<any> {
    // return this.http.get<any>(this.webApiUrl + "GetDevices")
    //   .toPromise();
    let params = new HttpParams();
    params = params.append('includeConnections', includeConnections.toString());
    params = params.append('includeAvailability',includeAvailability.toString());
    params = params.append('includeProperties',includeProperties.toString());

    return new Promise ((resolve, reject) => {
      this.http.get<any>(this.webApiUrl + "GetDevices", { params: params })
      .toPromise()
      .then(response => {
        // let result: DeviceInfoDto[] = [];
        // response.forEach(element => {
        //   result.push(
        //     new DeviceInfoDto(element["Id"], element["Name"], element["DeviceType"], element["IsConnected"], element["CommunicationType"], null)
        //   )
        // });
        resolve(response);
      });
    });
  }

  getConnections(): any {
    return this.http.get<any>(this.webApiUrl + "GetConnections")
      .toPromise();
  }

  // getDevicesWithListeners() {
  //   // return this.http.get<any>(this.webApiUrl + "GetDevicesWithListeners")
  //   //   .toPromise();
  //   return new Promise ((resolve, reject) => {
  //     this.http.get<any>(this.webApiUrl + "GetDevicesWithListeners")
  //     .toPromise()
  //     .then(response => {
  //       let result: DeviceInfoDto[] = [];
  //       response.forEach(element => {
  //         let connectedListeners: ListenersWithSenderPropertyDto[] = [];
  //         element["ConnectedListeners"].forEach(property => {
  //           let propertyListeners: ListenerDataDto[] = [];
  //           property["Listeners"].forEach(listener => {
  //             propertyListeners.push(new ListenerDataDto(listener["DeviceId"], listener["PropertyName"], listener["Condition"], listener["ConditionValue"]))
  //           });
  //           connectedListeners.push(new ListenersWithSenderPropertyDto(property["PropertyName"], propertyListeners));
  //         });
  //         result.push(
  //           new DeviceInfoDto(element["Id"], element["Name"], element["DeviceType"], element["IsConnected"], element["CommunicationType"], connectedListeners)
  //         )
  //       });
  //       resolve(result);
  //     });
  //   });
  // }

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

  setConnections(senderDeviceId: number, senderPropertyId: number, listeners: ListenerDataDto[]) {
    return this.manageListeners("SetListeners", senderDeviceId, senderPropertyId, listeners);
  }

  addConnections(senderDeviceId: number, senderPropertyId: number, listeners: ListenerDataDto[]) {
    return this.manageListeners("AddListeners", senderDeviceId, senderPropertyId, listeners);
  }

  removeConnection(connectionId: number) {
    let params = new HttpParams().set('connectionId', connectionId.toString());
    return this.http.get<any>(this.webApiUrl + "RemoveConnection", { params: params })
      .toPromise();
  }

  //DOESN'T WORK
  removeConnections(connectionsIds: number[]) {
    let params = new HttpParams();
    connectionsIds.forEach(id => {
      params = params.append('connectionsIds[]', id.toString());
    });
    // let params = new HttpParams().set('connectionsIds', connectionsIds);
    return this.http.get<any>(this.webApiUrl + "RemoveConnections", { params: params })
      .toPromise();
  }

  private manageListeners(method: string, senderDeviceId: number, senderPropertyId: number, listeners: ListenerDataDto[]) {
    let postBody = new SetListenersDto(senderDeviceId, senderPropertyId, listeners);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post<any>(this.webApiUrl + method, postBody, { headers: headers })
      .toPromise();
  }

}
