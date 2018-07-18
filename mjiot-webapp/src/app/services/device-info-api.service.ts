import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WebAPIUrl } from '../injection-tokens';
import { ConnectionInfo } from '../models/dtos/connection-info';

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

  setConnections(connections: ConnectionInfo[]) {
    return this.manageConnections("SetConnections", connections);
  }

  addConnections(connections: ConnectionInfo[]) {
    return this.manageConnections("AddConnections", connections);
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

  private manageConnections(action: string, connections: ConnectionInfo[]) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post<any>(this.webApiUrl + action, connections, { headers: headers })
      .toPromise();
  }

}
