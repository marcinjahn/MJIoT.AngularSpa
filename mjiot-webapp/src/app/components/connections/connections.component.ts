import { Component, OnInit } from '@angular/core';
import { DeviceInfoApiService } from '../../services/device-info-api.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {
  connectionsPromise: Promise<any>;
  connectionsFetched: boolean;
  connectionsAmount: number;
  devicesAndProperties: Promise<Array<any>>;
  newConnectionFormVisible: boolean;


  constructor(private deviceInfoApi: DeviceInfoApiService) {
    this.connectionsPromise = this.deviceInfoApi.getConnections();
    this.devicesAndProperties = this.deviceInfoApi.getDevices(false, false, true);

    this.connectionsPromise.then(res => {
      this.connectionsFetched = true;
      this.connectionsAmount = res.length;
    });

    this.devicesAndProperties.then(res => {
      console.log('devices with properties');
      console.log(res);
    });

   }

  showNewConnectionFormClicked() {
    this.newConnectionFormVisible = true;
  }

  ngOnInit() {
  }

}
