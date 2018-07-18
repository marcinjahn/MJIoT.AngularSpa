import { Component, OnInit } from '@angular/core';
import { DeviceInfoApiService } from '../../services/device-info-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  constructor(private deviceInfoApi: DeviceInfoApiService) { 
    this.devicesPromise = this.deviceInfoApi.getDevices(false, false, true);
    this.devicesPromise.then(res => {
      this.devicesFetched = true;
    });
  }

  devicesPromise: Promise<any>;
  devicesFetched: boolean;

  form: FormGroup;
  deviceSelect: FormControl;
  propertySelect: FormControl;

  deviceChanged() {

  }

  propertyChanged() {
    
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
