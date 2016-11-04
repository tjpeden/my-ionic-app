import { Component, ViewChild } from '@angular/core';
import { Deploy } from '@ionic/cloud-angular';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { BLEListPage } from '../pages/ble-list/ble-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = BLEListPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public deploy: Deploy
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'BLE Devices', component: BLEListPage },
    ];

    this.deploy.channel = 'dev';
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      this.deploy.check().then((snapshotAvailable: boolean) => {
        if(snapshotAvailable) {
          this.deploy.download().then(() => {
            return this.deploy.extract();
          }).then(() => {
            this.deploy.load();
          });
        }
      });
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
