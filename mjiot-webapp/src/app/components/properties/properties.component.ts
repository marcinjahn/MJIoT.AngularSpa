import { Component, OnInit } from '@angular/core';
import { DeviceInfoApiService } from '../../services/device-info-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropertiesApiService } from '../../services/properties-api.service';
import { DatetimeFormatterService } from '../../services/datetime-formatter.service';
import { BooleanHistoryDataFetcher } from '../../services/boolean-history-data-fetcher.service';
import { ChartjsService } from '../../services/chartjs.service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  constructor(private deviceInfoApi: DeviceInfoApiService, private propertiesApi: PropertiesApiService) { 
    this.datetimeFormatter = new DatetimeFormatterService();
    this.booleanFetcher = new BooleanHistoryDataFetcher(this.propertiesApi);
    this.chartJsService = new ChartjsService(this.datetimeFormatter);

    this.devicesPromise = this.deviceInfoApi.getDevices(false, false, true);
    this.devicesPromise.then(res => {
      this.devicesFetched = true;
      this.devices = res;
      if (this.devices.length != 0)
        this.deviceSelect.patchValue(this.devices[0]);
    });
  }

  booleanFetcher: BooleanHistoryDataFetcher;
  datetimeFormatter: DatetimeFormatterService;
  chartJsService: ChartjsService;

  devicesPromise: Promise<any>;
  devicesFetched: boolean;

  devices: Array<any>;
  properties: Array<any>

  lastValue: string;

  form: FormGroup;
  deviceSelect: FormControl;
  propertySelect: FormControl;

  // async getDevices() : Promise<Array<string>> {
  //   let devices = [];
  //   (await this.devicesPromise).forEach(element => {
  //     devices.push(element.Name);
  //   });

  //   return devices;
  // }

  getProperties(deviceId: number) {
    return 1;
  }

  deviceChanged() {
    this.properties = this.deviceSelect.value.Properties;
    if (this.properties.length != 0)
      this.propertySelect.patchValue(this.properties[0]);
  }

  propertyChanged() {
    this.fetchValues();
  }

  async fetchValues() {
    await this.fetchLastValue();
    await this.fetchHistoricalValues();
    
  }

  private async fetchHistoricalValues() {
    let delegate;
    if (this.propertySelect.value.Format == 0)
      delegate = this.booleanFetcher;
    else
      delegate = this.propertiesApi;
    let values = await delegate.getValues(this.deviceSelect.value.Id, this.propertySelect.value.Name, this.datetimeFormatter.formatDate(new Date(2018, 7, 1, 1, 0, 0, 0)), this.datetimeFormatter.formatDate(new Date()));
    console.log(values);
    this.chartData = this.chartJsService.generateDataSet(values, this.propertySelect.value.Name);
  }

  private async fetchLastValue() {
    let lastValue = await this.propertiesApi.getLastValue(this.deviceSelect.value.Id, this.propertySelect.value.Name);
    if (lastValue != null)
      this.lastValue = lastValue["PropertyValue"];
    else
      this.lastValue = "This property has never been set and does not contain any value.";
  }

  setupForm(): void {
    this.deviceSelect = new FormControl('', Validators.required);
    this.propertySelect = new FormControl('', Validators.required);

    this.form = new FormGroup({
      device: this.deviceSelect,
      property: this.propertySelect
    });

    this.deviceSelect.valueChanges
      .subscribe(device => this.deviceChanged());

    this.propertySelect.valueChanges
      .subscribe(property => this.propertyChanged());
  }

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

  chartData = [
    { data: [{
      x: "2017",
      y: 1
  }, {
      t: "2018",
      y: 10
  }], label: 'Account A' }
  ];

  // chartLabels = ['03-10-2017 12:14', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

  ngOnInit() {
    this.setupForm();
  }

}
