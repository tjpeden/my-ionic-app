import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { BLE } from 'ionic-native';

import { Device } from '../../app/device';
import { BatteryLevel } from '../../app/battery-level';

@Component({
  templateUrl: 'battery-state.html'
})
export class BatteryStatePage {
  device: Device;
  batteryLevel: number;

  constructor(
    public view: ViewController,
    public params: NavParams
  ) {
    this.device = params.get('device');
  }

  readBatterState(event) {
    BLE.read(this.device.id, BatteryLevel.service, BatteryLevel.characteristic).then(
      data => {
        console.log("Data read");
        this.batteryLevel = new Uint8Array(data)[0];
      },
      error => {
        console.log(error);
      }
    );
  }
}
