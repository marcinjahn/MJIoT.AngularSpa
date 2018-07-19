import { Injectable } from '@angular/core';
import { DatetimeFormatterService } from './datetime-formatter.service';

@Injectable()
export class ChartjsService {

  constructor(private dateTimeFormatter: DatetimeFormatterService) { }

  generateDataSet(rawData: Array<object>, label: string) {
    let result = [];

    rawData.forEach(n => {
      result.push({
        x: this.dateTimeFormatter.parse(n["Timestamp"]),
        y: n["PropertyValue"]
      });
    });

    result = [{data: result, label: label}];

    console.log(result);

    return result;
  }
}
