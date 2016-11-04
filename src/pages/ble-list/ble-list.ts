import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  PopoverController,
} from 'ionic-angular';
import { Toast, BLE } from 'ionic-native';

import { BatteryStatePage } from '../battery-state/battery-state';

interface IDevice {
  name: string;
  id: string;
  advertising: Array<number>;
  rssi: number;
}

@Component({
  templateUrl: 'ble-list.html',
})
export class BLEListPage {
  devices: Array<IDevice>;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public popoverController: PopoverController
  ) {
    this.devices = [];
  }
  
  ionViewDidLoad() {
    Toast.showShortTop("Starting BLE Scan");

    BLE.enable().then(() => {
      BLE.startScan([]).subscribe(device => this.onDiscoverDevice(device));
    });
  }

  onDiscoverDevice(device: IDevice) {
    Toast.showShortBottom("Device Discovered");
    this.devices.push(device);
  }

  onError(error: Error) {
    Toast.showLongTop("Error")
    console.error(error);
  }

  connect(event: Event, device: IDevice) {
    let connecting = this.loadingController.create({
      content: "Please wait..."
    });
    
    connecting.present();
    
    BLE.connect(device.id).subscribe(() => {
      let popover = this.popoverController.create(BatteryStatePage, {device});
      
      connecting.dismiss();
      
      popover.present();
    });
  }
}
