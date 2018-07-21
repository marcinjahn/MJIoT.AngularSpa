import { Component, OnInit } from '@angular/core';
import { DeviceInfoApiService } from '../../services/device-info-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropertiesApiService } from '../../services/properties-api.service';
import { BooleanHistoryDataFetcher } from '../../services/boolean-history-data-fetcher.service';
import { ChartjsService } from '../../services/chartjs.service';
import { DatetimeFormatterService } from '../../services/datetime-formatter.service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  constructor(private deviceInfoApi: DeviceInfoApiService, private propertiesApi: PropertiesApiService) { 
    this.booleanFetcher = new BooleanHistoryDataFetcher(this.propertiesApi);
    // this.chartJsService = new ChartjsService(this.propertiesApi.dateTimeFormatter);
    this.historicalValuesController = new HistoricalValuesDisplayController();
    this.historicalValuesController.displayMessage(new MessageContent("No property is selected", "Select the device and one of its historized properties to see its values."));

    this.devicesPromise = this.deviceInfoApi.getDevices(false, false, true);
    this.devicesPromise.then(res => {
      this.devicesFetched = true;
      this.devices = res;
      if (this.devices.length != 0)
        this.deviceSelect.patchValue(this.devices[0]);
    });
  }

  booleanFetcher: BooleanHistoryDataFetcher;
  chartJsService: ChartjsService;
  historicalValuesController: HistoricalValuesDisplayController;

  devicesPromise: Promise<any>;
  devicesFetched: boolean;

  devices: Array<any>;
  properties: Array<any>

  lastValue: string;

  form: FormGroup;
  deviceSelect: FormControl;
  propertySelect: FormControl;

  getProperties(deviceId: number) {
    return 1;
  }

  deviceChanged() {
    this.properties = this.deviceSelect.value.Properties;
    if (this.properties.length != 0)
      this.propertySelect.patchValue(this.properties[0]);
  }

  propertyChanged() {
    this.displayValues();
  }

  async displayValues() {
    let lastValue = await this.fetchLastValue();
    if (lastValue != null)
      this.lastValue = lastValue["PropertyValue"];
    else {
      this.lastValue = "--";
      this.historicalValuesController.displayMessage(new MessageContent("No values are available", "Looks like this property has never been set and it does not contain any values."));
      return;
    }
    if (!this.propertySelect.value.IsHistorized) {
      this.historicalValuesController.displayMessage(new MessageContent("Selected property is not historized", "Past values of non-hisotrized properties cannot be displayed, since they are not stored by the Platform."));
      return;
    }
    let values = await this.fetchHistoricalValues();
    if (this.propertySelect.value.Format != 1)
      this.historicalValuesController.displayNumericalValues(values, this.propertySelect.value.Name);
    else
      this.historicalValuesController.displayStringValues(values, this.propertySelect.value.Name);
  }

  private async fetchHistoricalValues() {
    let formatter = this.propertiesApi.dateTimeFormatter;
    let delegate;
    if (this.propertySelect.value.Format == 0)
      delegate = this.booleanFetcher;
    else
      delegate = this.propertiesApi;
    let values = await delegate.getValues(
      this.deviceSelect.value.Id, 
      this.propertySelect.value.Name, 
      formatter.formatDate(formatter.addDays(new Date(), -1)), 
      formatter.formatDate(new Date())
    );
    console.log(values);
    return values;
  }

  private async fetchLastValue() {
    return await this.propertiesApi.getLastValue(this.deviceSelect.value.Id, this.propertySelect.value.Name);
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

  // chartLabels = ['03-10-2017 12:14', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

  ngOnInit() {
    this.setupForm();
  }

}


class HistoricalValuesDisplayController {
  constructor() {
    this.chartjsService = new ChartjsService(new DatetimeFormatterService());
  };

  public chartjsService: ChartjsService;

  public messageBoxContent: MessageContent;
  public stringValues: Array<StringValue>

  public chartVisible: boolean;
  public messageBoxVisible: boolean;
  public stringDisplayVisible: boolean;



  displayMessage(message: MessageContent) {
    this.messageBoxContent = message;
    this.showMessageBox();
  }

  displayStringValues(values: any, propertyName: string): any {
    // this.displayMessage(new MessageContent("Selected property is a string", "String properties cannot be displayed in this version of MJIoT Platform App"));
    this.stringValues = StringPropertyFormatter.format(values);
    this.showStringDisplay();
  }

  displayNumericalValues(values: any, propertyName: string): any {
    let dataSet = this.chartjsService.generateDataSet(values, propertyName);
    this.chartjsService.setChartData(dataSet);
    this.showChart();
  }

  private hideChart() {
    this.chartVisible = false;
    this.chartjsService.setChartData(this.chartjsService.getEmptyDataSet(""));
  }

  private hideStringDisplay() {
    this.stringDisplayVisible = false;
    this.stringValues = [];
  }

  private hideMessageBox() {
    this.messageBoxVisible = false;
    this.messageBoxContent = MessageContent.Empty();
  }

  private showChart() {
    this.hideMessageBox();
    this.hideStringDisplay();
    this.chartVisible = true;
  }

  private showMessageBox() {
    this.hideStringDisplay();
    this.hideChart();
    this.messageBoxVisible = true;
  }

  private showStringDisplay() {
    this.hideChart();
    this.hideMessageBox();
    this.stringDisplayVisible = true;
  }
}


class StringPropertyFormatter {
  static format(values: Array<object>): Array<StringValue> {
    var dateFormatter = new DatetimeFormatterService();
    let result: Array<StringValue> = [];
    values.forEach(n => {
      result.push(new StringValue(dateFormatter.getReadableDate(n['Timestamp']), n['PropertyValue']));
      // result += `<b>${dateFormatter.getReadableDate(n['Timestamp'])}</b>: ${n['PropertyValue']}<br>`;
    });

    return result;
  }
}


class StringValue {

  constructor(timestamp: string, content: string) {
    this.timestamp = timestamp;
    this.content = content;
  }
  
  private _timestamp : string;
  public get timestamp() : string {
    return this._timestamp;
  }
  public set timestamp(v : string) {
    this._timestamp = v;
  }
  
  
  private _content : string;
  public get content() : string {
    return this._content;
  }
  public set content(v : string) {
    this._content = v;
  }
  
}

class MessageContent {

  constructor(header: string, description: string) {
    this.header = header;
    this.description = description;
  }

  static Empty(): MessageContent {
    return new MessageContent("", "");
  }
  
  private _header : string;
  public get header() : string {
    return this._header;
  }
  public set header(v : string) {
    this._header = v;
  }
  
  
  private _description : string;
  public get description() : string {
    return this._description;
  }
  public set description(v : string) {
    this._description = v;
  }
  
}


