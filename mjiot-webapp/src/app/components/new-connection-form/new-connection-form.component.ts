import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionConfigType } from '../../models/connections/connection-config-type';
import { ConnectionConfigsService } from '../../services/connection-configs.service';
import { ConnectionInfo } from '../../models/dtos/connection-info';
import { DeviceInfoApiService } from '../../services/device-info-api.service';

@Component({
  selector: 'app-new-connection-form',
  templateUrl: './new-connection-form.component.html',
  styleUrls: ['./new-connection-form.component.css']
})
export class NewConnectionFormComponent implements OnInit {

  @Input() devicesAndProperties: Array<any>;

  @Output() connectionAdded = new EventEmitter<boolean>();
  @Output() closeButtonClicked = new EventEmitter<boolean>();

  form: FormGroup;
  senderDevice: FormControl;
  senderProperty: FormControl;
  listenerDevice: FormControl;
  listenerProperty: FormControl;
  filterType: FormControl;
  filterValue: FormControl;
  calculationType: FormControl;
  calculationValue: FormControl;

  filterTypes: Array<ConnectionConfigType>;
  calculationTypes: Array<ConnectionConfigType>;

  constructor(private connectionConfigsService: ConnectionConfigsService, private deviceInfoApi: DeviceInfoApiService) { }

  onSaveClicked() {
    let newConnection = new ConnectionInfo(
      this.senderDevice.value["Id"], 
      this.senderProperty.value["Id"], 
      this.listenerDevice.value["Id"], 
      this.listenerProperty.value["Id"],
      this.filterType.value["enumValue"],
      this.filterValue.value,
      this.calculationType.value["enumValue"],
      this.calculationValue.value
    );
    console.log(newConnection);

    this.deviceInfoApi.addConnections( [newConnection] );

    this.connectionAdded.emit(true);
  }

  initializeForm() {
    this.senderDevice = new FormControl('', Validators.required);
    this.senderProperty = new FormControl('', Validators.required);
    this.listenerDevice = new FormControl('', Validators.required);
    this.listenerProperty = new FormControl('', Validators.required);
    this.filterType = new FormControl('', Validators.required);
    this.filterValue = new FormControl();
    this.calculationType = new FormControl('', Validators.required);
    this.calculationValue = new FormControl();

    this.form = new FormGroup({
      sender: new FormGroup({
        device: this.senderDevice,
        property: this.senderProperty
      }),
      listener: new FormGroup({
        device:  this.listenerDevice,
        property: this.listenerProperty
      }),
      filter: new FormGroup({
        type: this.filterType,
        value: this.filterValue
      }),
      calculation: new FormGroup({
        type: this.calculationType,
        value: this.calculationValue
      })
    });
  }

  getSenderDevices(): Array<any> {
    let senders = [];
    if (this.devicesAndProperties != null) {
      this.devicesAndProperties.forEach(device => {
        if (device["CommunicationType"] == 0 || device["CommunicationType"] == 2)
        senders.push(device);
      });
    }

    return senders;
  }

  getListenerDevices(): Array<any> {
    let listeners = [];
    if (this.devicesAndProperties != null) {
      this.devicesAndProperties.forEach(device => {
        if (device["CommunicationType"] == 1 || device["CommunicationType"] == 2)
          listeners.push(device);
      });
    }
    return listeners;
  }

  getSenderProperties(device: any): Array<any> {
    let result = [];
    console.log(device);
    if (device !== null && device["Properties"] !== undefined) {
      device["Properties"].forEach(property => {
        if (property["IsSenderProperty"])
          result.push(property);
      });
    }

    return result;
  }

  getListenerProperties(device: any): Array<any> {
    let result = [];
    if (device !== null && device["Properties"] !== undefined) {
      device["Properties"].forEach(property => {
        if (property["IsListenerProperty"])
          result.push(property);
      });
    }

    return result;
  }

  devicesAndPropertiesAreSelected(): boolean {
    return (this.senderDevice.value != '' && this.senderProperty.value != '' && this.listenerDevice.value != '' && this.listenerProperty.value != '');
  }

  propertiesSetChanged() {
    if (this.senderProperty.value != "" && this.listenerProperty.value != "") {
      this.filterTypes = this.connectionConfigsService.getFilterTypes(this.senderProperty.value["Format"], this.listenerProperty.value["Format"]);
      this.calculationTypes = this.connectionConfigsService.getCalculationType(this.senderProperty.value["Format"], this.listenerProperty.value["Format"]);
    }
    console.log("SENDER");
    console.log(this.senderProperty.value);
    console.log("LISTENER");
    console.log(this.listenerProperty.value);
  }


  ngOnInit() {
    this.initializeForm();

    this.senderProperty.valueChanges
      .subscribe(property => this.propertiesSetChanged());

    this.listenerProperty.valueChanges
      .subscribe(property => this.propertiesSetChanged());
  }



}
