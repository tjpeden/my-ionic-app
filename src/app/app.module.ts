import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';

import { BLEListPage } from '../pages/ble-list/ble-list';
import { BatteryStatePage } from '../pages/battery-state/battery-state';

const cloudSettings: CloudSettings = {
  core: {
    app_id: 'e08e499d'
  }
}

@NgModule({
  declarations: [
    MyApp,
    BLEListPage,
    BatteryStatePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BLEListPage,
    BatteryStatePage,
  ],
  providers: []
})
export class AppModule {}
