import { Injectable } from '@angular/core';
import { PropertiesApiService } from './properties-api.service';



@Injectable()
export class BooleanHistoryDataFetcher {

  constructor(private propertiesApi: PropertiesApiService) { }

  async getValues(deviceId: number, propertyName: string, startTime: string, endTime: string, ) : Promise<Array<object>> {
    let data: Array<object> = await this.propertiesApi.getValues(deviceId, propertyName, startTime, endTime);

    data.forEach(n => {
      if (n["PropertyValue"] == "true")
        n["PropertyValue"] = 1;
      else
        n["PropertyValue"] = 0;
    })

    return data;
  }
}
