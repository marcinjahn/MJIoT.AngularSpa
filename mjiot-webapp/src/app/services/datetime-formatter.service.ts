import { Injectable } from '@angular/core';
import * as fecha from "fecha";

@Injectable()
export class DatetimeFormatterService {

  constructor() { }

  formatDate(date: Date): string {
    let result = fecha.format(date, 'DD/MM/YYYY hh:mm:ss A');
    console.log(result);
    return result;
  }
}
