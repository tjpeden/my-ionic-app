import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BLEListPage } from '../pages/ble-list/ble-list';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  core: {
    app_id: 'e08e499d'
  }
}

@NgModule({
  declarations: [
    MyApp,
    BLEListPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BLEListPage,
  ],
  providers: []
})
export class AppModule {}
