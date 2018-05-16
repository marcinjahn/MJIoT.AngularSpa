import { Component, OnInit } from '@angular/core';
import { DeviceInfoApiService } from '../../services/device-info-api.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {
  connectionsPromise: Promise<any>;

  constructor(private deviceInfoApi: DeviceInfoApiService) {
    this.connectionsPromise = this.deviceInfoApi.getConnections();
    this.connectionsPromise.then(res => {
      this.connectionsFetched = true;
      this.connectionsAmount = res.length;
    });
   }

   connectionsFetched: boolean;
   connectionsAmount: number;

  ngOnInit() {
  }

}
