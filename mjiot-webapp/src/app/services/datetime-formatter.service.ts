import { Injectable } from '@angular/core';
import * as fecha from "fecha";
import { isDate } from 'util';

@Injectable()
export class DatetimeFormatterService {

  constructor() { }

  private format: string = 'DD/MM/YYYY hh:mm:ss A';

  formatDate(date: Date): string {
    let result = fecha.format(date, this.format);
    return result;
  }

  parse(dateString: string): Date {
    let result = fecha.parse(dateString, this.format);
    return result as Date;
  }
}
