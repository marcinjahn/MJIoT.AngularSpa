import { Component, OnInit } from '@angular/core';
import { DeviceInfoApiService } from '../../services/device-info-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropertiesApiService } from '../../services/properties-api.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  constructor(private deviceInfoApi: DeviceInfoApiService, private propertiesApi: PropertiesApiService) { 
    this.devicesPromise = this.deviceInfoApi.getDevices(false, false, true);
    this.devicesPromise.then(res => {
      this.devicesFetched = true;
      this.devices = res;
      if (this.devices.length != 0)
        this.deviceSelect.patchValue(this.devices[0]);
    });
  }

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
    this.propertiesApi.getLastValue(this.deviceSelect.value.Id, this.propertySelect.value.Name).then(data => {
      console.log('fetched');
      console.log(data);
      if (data != null)
        this.lastValue = data["PropertyValue"];
      else
        this.lastValue = "This property has never been set and does not contain nay value."
    },
    error => {
      console.log('Cannot get property last value from API.');
    });
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

  ngOnInit() {
    this.setupForm();
  }

}
