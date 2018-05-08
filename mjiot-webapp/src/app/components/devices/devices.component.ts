import { Component, OnInit } from '@angular/core';
import { DeviceInfoApiService } from '../../services/device-info-api.service';
import { ListenerDataDto } from '../../models/dtos/listener-data-dto';
import { DeviceConnectionCondition } from '../../enums/device-connection-condition.enum';

@Component({
  selector: 'app-main',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor( private deviceInfoApi: DeviceInfoApiService ) { }

  async ngOnInit() {
    let res = await this.deviceInfoApi.getDevices();
    console.log(res);

    // let res2 = await this.deviceInfoApi.setListeners(7, 5, [new ListenerDataDto(8, 3, DeviceConnectionCondition.NoCondition, null)]);
    // console.log(res2);
  }

}
