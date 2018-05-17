import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionConfigType } from '../../models/connection-config-type';
import { ConnectionConfigsService } from '../../services/connection-configs.service';

@Component({
  selector: 'app-new-connection-form',
  templateUrl: './new-connection-form.component.html',
  styleUrls: ['./new-connection-form.component.css']
})
export class NewConnectionFormComponent implements OnInit {

  @Input() devicesAndProperties: Array<any>;

  form: FormGroup;
  senderDevice: FormControl;
  senderProperty: FormControl;
  listenerDevice: FormControl;
  listenerProperty: FormControl;

  filterTypes: Array<ConnectionConfigType>;
  calculationTypes: Array<ConnectionConfigType>;

  constructor(private connectionConfigsService: ConnectionConfigsService) { }

  onSaveClicked() {
    console.log('Save clicked');
  }

  initializeForm() {
    this.senderDevice = new FormControl('', Validators.required);
    this.senderProperty = new FormControl('', Validators.required);
    this.listenerDevice = new FormControl('', Validators.required);
    this.listenerProperty = new FormControl('', Validators.required);

    this.form = new FormGroup({
      sender: new FormGroup({
        device: this.senderDevice,
        property: this.senderProperty
      }),
      listener: new FormGroup({
        device:  this.listenerDevice,
        property: this.listenerProperty
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

  devicesAndPropertiesAreSelected(): boolean {
    return (this.senderDevice.value != '' && this.senderProperty.value != '' && this.listenerDevice.value != '' && this.listenerProperty.value != '');
  }

  propertiesSetChanged() {
    if (this.senderProperty.value != "" && this.listenerProperty.value != "") {
      this.filterTypes = this.connectionConfigsService.getFilterTypes(this.senderProperty.value["Format"], this.listenerProperty.value["Format"]);
      this.calculationTypes = this.connectionConfigsService.getCalculationType(this.senderProperty.value["Format"], this.listenerProperty.value["Format"]);
    }
    console.log("SENDER");
    console.log(this.senderProperty.value);
    console.log("LISTENER");
    console.log(this.listenerProperty.value);
  }


  ngOnInit() {
    this.initializeForm();

    this.senderProperty.valueChanges
      .subscribe(property => this.propertiesSetChanged());

    this.listenerProperty.valueChanges
      .subscribe(property => this.propertiesSetChanged());
  }



}
