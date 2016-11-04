import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Toast, BLE } from 'ionic-native';

// import { BatteryStatePage } from '../battery-state/battery-state';

@Component({
  templateUrl: 'ble-list.html',
})
export class BLEListPage {
  devices: Array<any>;

  constructor(
    public navController: NavController,
    public navParams: NavParams
  ) {
    this.devices = [];

    Toast.showShortTop("Starting BLE Scan");
    BLE.isEnabled().then(
      () => {
        this.discoverDevices();
      },
      () => {
        BLE.enable().then(() => this.discoverDevices());
      }
    );
  }

  discoverDevices() {
    BLE.scan([], 10).subscribe(device => this.onDiscoverDevice(device))
  }

  onDiscoverDevice(device: any) {
    Toast.showShortBottom("Device Discovered");
    this.devices.push(device);
  }

  onError(error: Error) {
    Toast.showLongTop("Error")
    console.error(error);
  }

  connect(event: Event, device: any) {
    console.log(JSON.stringify(device, null, 2));
    // this.navController.push(BatteryStatePage, {device});
  }
}
