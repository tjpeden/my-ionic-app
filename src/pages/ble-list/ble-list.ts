import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { BLE } from 'ionic-native';

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
    BLE.enable().then(
      () => {
        BLE.scan([], 5).subscribe(device => this.onDiscoverDevice(device));
      },
      error => this.onError(error)
    )
  }
  
  onDiscoverDevice(device) {
    this.devices.push(device);
  }
  
  onError(error) {
    console.error(error);
  }
  
  connect(event, device) {
    console.log(device);
    // this.navCtrl.push(BatteryStatePage, {
    //   device,
      
    // });
  }
}