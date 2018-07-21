import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PropertiesAPIUrl } from '../injection-tokens';
import { DatetimeFormatterService } from './datetime-formatter.service';

@Injectable()
export class PropertiesApiService {

  public dateTimeFormatter: DatetimeFormatterService;

  constructor(private http: HttpClient, @Inject(PropertiesAPIUrl) private apiUrl) {
    this.dateTimeFormatter = new DatetimeFormatterService();
  }

  getLastValue(deviceId: number, propertyName: string): Promise<object> {
    console.log(deviceId);
    console.log(propertyName);
    return this.http.get<any>(`${this.apiUrl}${deviceId}/${propertyName}`).toPromise();
  }

  getValues(deviceId: number, propertyName: string, startTime: string, endTime: string): Promise<Array<object>> {
    console.log(startTime);
    console.log(endTime);
    let params = new HttpParams();
    params = params.append('startTime', startTime.toString());
    params = params.append('endTime',endTime.toString());
    return this.http.get<any>(`${this.apiUrl}${deviceId}/${propertyName}`, { params: params }).toPromise();
  }

}
