import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-connection',
  templateUrl: './single-connection.component.html',
  styleUrls: ['./single-connection.component.css']
})
export class SingleConnectionComponent implements OnInit {

  constructor() { }

  @Input() connection:any;

  ngOnInit() {
  }

}
