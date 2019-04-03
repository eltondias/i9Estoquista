import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { UtilProvider } from '../providers/util/util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;


    pages: any[] = [
      { title: 'Sobre', component: 'SobrePage' },
      { title: 'Sair', component: 'LoginPage' }
    ]

  constructor(
      platform: Platform, 
      statusBar: StatusBar, 
      splashScreen: SplashScreen,
      private storage: Storage,
      public util: UtilProvider 
      ) {

      
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.component === 'LoginPage') {
      this.sair();
    } else {
      this.navCtrl.setRoot(page.component);
    }
   
  }

  sair() {
    this.storage.remove('cpf');
    this.storage.remove('empresas').then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
  
}
