import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceInfoApiService } from '../../services/device-info-api.service';

@Component({
  selector: '[app-single-connection]',
  templateUrl: './single-connection.component.html',
  styleUrls: ['./single-connection.component.css']
})
export class SingleConnectionComponent implements OnInit {

  constructor(private deviceInfoApi: DeviceInfoApiService) { }

  deleteShown: boolean;

  @Input() connection:any;

  @Output() connectionDeleted = new EventEmitter<boolean>();

  deleteConnectionClicked(connectionId: number) {
    console.log('DELETION OF CONNECTION');
    console.log(connectionId);
    this.deviceInfoApi.removeConnection(connectionId).then(
      res => this.connectionDeleted.emit(true)
    );


  }

  ngOnInit() {
  }

}
