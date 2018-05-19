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
    this.devicesAndProperties = this.deviceInfoApi.getDevices(false, false, true);

    this.devicesAndProperties.then(res => {
      console.log('devices with properties');
      console.log(res);
    });

    this.fetchConnections();
  }

  fetchConnections(): void {
    this.connectionsPromise = this.deviceInfoApi.getConnections();
    this.connectionsPromise.then(res => {
      this.connectionsFetched = true;
      this.connectionsAmount = res.length;
    });
  }

  showNewConnectionFormClicked(): void {
    this.newConnectionFormVisible = true;
  }

  connectionsChanged(data): void {
    this.newConnectionFormVisible = false;
    this.connectionsFetched = false;

    this.fetchConnections();
  }

  ngOnInit() {
  }

}
