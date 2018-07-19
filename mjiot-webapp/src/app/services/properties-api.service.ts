import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PropertiesAPIUrl } from '../injection-tokens';

@Injectable()
export class PropertiesApiService {

  constructor(private http: HttpClient, @Inject(PropertiesAPIUrl) private apiUrl) { }

  getLastValue(deviceId: number, propertyName: string): Promise<object> {
    console.log(deviceId);
    console.log(propertyName);
    return this.http.get<any>(`${this.apiUrl}${deviceId}/${propertyName}`).toPromise();
  }

  getValues(deviceId: number, propertyName: string, startTime: string, endTime: string): Promise<Array<object>> {
    let params = new HttpParams();
    params = params.append('startTime', startTime.toString());
    params = params.append('endTime',endTime.toString());
    return this.http.get<any>(`${this.apiUrl}${deviceId}/${propertyName}`, { params: params }).toPromise();
  }

}
