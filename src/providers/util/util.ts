import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  atualizarProdutosContabilizadosEmiter = new EventEmitter();
  atualizarTabsEmiter = new EventEmitter();
  ativarScannerEmiter = new EventEmitter();


  constructor(public http: HttpClient,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    ) {
    console.log('Hello UtilProvider Provider');
  }


  showAlert(title, subTitle, buttons: any[]  ) {
    const alert = this.alertController.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  loading(mensagem, duracao): Loading {
    const loader = this.loadingCtrl.create({
      content: mensagem,
      duration: duracao
    });
    loader.present();
    return loader;
  }



}
