import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProdutosContabilizadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos-contabilizados',
  templateUrl: 'produtos-contabilizados.html',
})
export class ProdutosContabilizadosPage {


  empresaSelecionada: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.empresaSelecionada = this.navParams.get('empresa');
    console.log( this.empresaSelecionada);  
  }

}
