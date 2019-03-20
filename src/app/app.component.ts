import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;


    pages: any[] = [
      { title: 'Sair', component: 'LoginPage' },
      // { title: 'Tutorial', component: 'TutorialPage' },
      // { title: 'Sobre', component: 'SobrePage' },
      // { title: 'Sair', component: 'SignoutPage' }
    ]

  constructor(
      platform: Platform, 
      statusBar: StatusBar, 
      splashScreen: SplashScreen,
      private storage: Storage
      ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

  sair() {
    this.storage.remove('cpf');
    this.storage.remove('empresas').then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
  
}
