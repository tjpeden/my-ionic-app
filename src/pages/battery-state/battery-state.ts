import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

interface IDevice {
  
}

@Component({
  templateUrl: 'battery-state.html'
})
export class BatteryStatePage {
  device: IDevice;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BatteryStatePage Page');
  }

}
