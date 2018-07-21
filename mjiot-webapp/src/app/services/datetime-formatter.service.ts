import { Injectable } from '@angular/core';
// import * as fecha from "fecha";
// import { isDate } from 'util';

@Injectable()
export class DatetimeFormatterService {

  constructor() { }

  private format: string = 'DD/MM/YYYY hh:mm:ss A';

  formatDate(date: Date): string {
    return date.toISOString();
    // let result = fecha.format(date, this.format);
    // return result;
  }

  parse(dateString: string): Date {
    return new Date(dateString);
    // let result = fecha.parse(dateString, this.format);
    // return result as Date;
  }

  addDays(date: Date, days: number) {
    var newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
}
