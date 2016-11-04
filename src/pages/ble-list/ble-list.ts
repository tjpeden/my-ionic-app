import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  ModalController,
  ToastController,
} from 'ionic-angular';
import { BLE } from 'ionic-native';

import { Device } from '../../app/device';

import { BatteryStatePage } from '../battery-state/battery-state';

@Component({
  templateUrl: 'ble-list.html',
})
export class BLEListPage {
  devices: Array<Device>;

  constructor(
    public nav: NavController,
    public toast: ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController
  ) {}

  ionViewDidLoad() {
    this.toast.create({
      message: "Starting BLE Scan",
      duration: 3000,
    });
    BLE.enable().then(() => this.discoverDevices());
  }

  discoverDevices() {
    this.devices = [];

    BLE.startScan([]).subscribe(device => this.onDiscoverDevice(device));
  }

  onDiscoverDevice(device: Device) {
    this.toast.create({
      message: "Device Discovered",
      duration: 1000,
    });
    this.devices.push(device);
  }

  onError(error: Error) {
    this.toast.create({
      message: "An error occurred",
      position: 'top',
      showCloseButton: true,
    });
    console.error(error);
  }

  connect(event: Event, device: Device) {
    let connecting = this.loadingController.create({
      content: "Please wait..."
    });

    BLE.stopScan();

    connecting.present();

    BLE.connect(device.id).subscribe(() => {
      let modal = this.modalController.create(BatteryStatePage, {device});

      modal.onDidDismiss(() => this.discoverDevices());

      connecting.dismiss();

      modal.present();
    });
  }
}
