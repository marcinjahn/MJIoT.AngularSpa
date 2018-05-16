import { Component, OnInit } from '@angular/core';
import { DeviceInfoApiService } from '../../services/device-info-api.service';
import { ListenerDataDto } from '../../models/dtos/listener-data-dto';
import { DeviceConnectionCondition } from '../../enums/device-connection-condition.enum';
import { DeviceInfoDto } from '../../models/dtos/device-info-dto';

@Component({
  selector: 'app-main',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor( private deviceInfoApi: DeviceInfoApiService ) {
    this.devicesPromise = this.deviceInfoApi.getDevices(false, false, false);
    this.devicesPromise.then(res => {
      this.devicesFetched = true;
      this.devicesAmount = res.length;
    });
    let tempDevicesPromise = this.deviceInfoApi.getDevices(false, true, false);
    tempDevicesPromise.then(
     result => {
      this.devicesPromise = tempDevicesPromise;
     }
    );
   }

  devicesPromise: Promise<any>;
  devicesFetched: boolean;

  devicesAmount: number;

  async ngOnInit() {
    // this.devices = await this.deviceInfoApi.getDevices();

    // let res2 = await this.deviceInfoApi.setListeners(7, 5, [new ListenerDataDto(8, 3, DeviceConnectionCondition.NoCondition, null)]);
    // console.log(res2);
  }

}
