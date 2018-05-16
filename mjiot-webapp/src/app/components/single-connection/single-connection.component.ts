import { Component, OnInit, Input } from '@angular/core';
import { DeviceInfoApiService } from '../../services/device-info-api.service';

@Component({
  selector: 'app-single-connection',
  templateUrl: './single-connection.component.html',
  styleUrls: ['./single-connection.component.css']
})
export class SingleConnectionComponent implements OnInit {

  constructor(private deviceInfoApi: DeviceInfoApiService) { }

  deleteShown: boolean;

  @Input() connection:any;

  deleteConnectionClicked(connectionId: number) {
    console.log('DELETION OF CONNECTION');
    console.log(connectionId);
    this.deviceInfoApi.removeConnection(connectionId).then(
      res => console.log(res)
    );
  }

  ngOnInit() {
  }

}
