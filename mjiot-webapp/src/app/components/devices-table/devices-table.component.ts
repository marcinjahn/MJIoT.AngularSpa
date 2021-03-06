import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.css']
})
export class DevicesTableComponent implements OnInit {

  constructor() { }

  @Input() devices: Array<any>;

  ngOnInit() {

  }

  ngOnChanges() {
    console.log('CHANGES');
    console.log(this.devices);
  }

}
