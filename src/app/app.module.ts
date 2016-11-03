import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BLEListPage } from '../pages/ble-list/ble-list';

@NgModule({
  declarations: [
    MyApp,
    BLEListPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BLEListPage,
  ],
  providers: []
})
export class AppModule {}
