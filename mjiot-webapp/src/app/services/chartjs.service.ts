import { Injectable } from '@angular/core';
import { DatetimeFormatterService } from './datetime-formatter.service';

@Injectable()
export class ChartjsService {

  chartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
          	'millisecond': 'MMM DD',
            'second': 'MMM DD',
            'minute': 'MMM DD',
            'hour': 'MMM DD',
            'day': 'MMM DD',
            'week': 'MMM DD',
            'month': 'MMM DD',
            'quarter': 'MMM DD',
            'year': 'MMM DD',
          }
        }
      }],
    }
  };

  chartData: Array<object>;

  constructor(private dateTimeFormatter: DatetimeFormatterService) {
  }

  generateDataSet(rawData: Array<object>, label: string) {
    let result = [];

    rawData.forEach(n => {
      result.push({
        x: this.dateTimeFormatter.parse(n["Timestamp"]),
        y: n["PropertyValue"]
      });
    });

    result = [{data: result, label: label, steppedLine: true}];
    return result;
  }

  getEmptyDataSet(label: string) {
    return [{data: [], label: label}];
  }

  getChartOptions() {
    return this.chartOptions;
  }

  getChartData() {
    return this.chartData;
  }

  setChartData(data: Array<object>) {
    this.chartData = data;
  }


}
