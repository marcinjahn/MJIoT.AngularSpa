import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-connection-form',
  templateUrl: './new-connection-form.component.html',
  styleUrls: ['./new-connection-form.component.css']
})
export class NewConnectionFormComponent implements OnInit {

  @Input() devicesAndProperties: Array<any>;

  form: FormGroup;

  constructor() { }

  onSaveClicked() {
    console.log('Save clicked');
  }

  ngOnInit() {
    this.form = new FormGroup({
      sender: new FormGroup({
        device: new FormControl('', Validators.required),
        property: new FormControl('', Validators.required)
      }),
      listener: new FormGroup({
        device: new FormControl('', Validators.required),
        property: new FormControl('', Validators.required)
      }),
      filter: new FormGroup({
        type: new FormControl('', Validators.required),
        value: new FormControl()
      }),
      calculation: new FormGroup({
        type: new FormControl('', Validators.required),
        value: new FormControl()
      })
    });
  }

}
