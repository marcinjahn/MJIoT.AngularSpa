import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PropertiesAPIUrl } from '../injection-tokens';

@Injectable()
export class PropertiesApiService {

  constructor(private http: HttpClient, @Inject(PropertiesAPIUrl) private apiUrl) { }

  getLastValue(deviceId: number, propertyName: object): Promise<string> {
    console.log(deviceId);
    console.log(propertyName);
    return this.http.get<any>(`${this.apiUrl}${deviceId}/${propertyName}`).toPromise();
  }

}
